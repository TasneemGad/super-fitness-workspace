import { computed, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { LanguageService } from '@org/i18n';
import { API_BASE_URL } from '@super-fitness/data-access-user';
import { ClassesPage } from './classes-page';

describe('ClassesPage group availability', () => {
  const base = 'https://fitness.elevateegy.com/api/v1';
  let http: HttpTestingController;
  let language: ReturnType<typeof signal<'en' | 'ar'>>;

  beforeEach(() => {
    language = signal<'en' | 'ar'>('en');
    TestBed.configureTestingModule({
      imports: [ClassesPage],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: base },
        { provide: LanguageService, useValue: {
          currentLang: language,
          isRtl: computed(() => language() === 'ar'),
        } },
      ],
    }).overrideComponent(ClassesPage, { set: { template: '', imports: [] } });
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('limits concurrency, hides confirmed-empty groups, and reuses details on selection', () => {
    const fixture = TestBed.createComponent(ClassesPage);
    fixture.detectChanges();
    const groups = ['a', 'b', 'c', 'd'].map((_id) => ({ _id, name: _id }));
    http.expectOne(base + '/muscles').flush({ musclesGroup: groups });
    http.expectNone(base + '/musclesGroup/d');
    http.expectOne(base + '/musclesGroup/a').flush({ muscles: [] });
    http.expectOne(base + '/musclesGroup/d').flush({ muscles: [{ _id: 'd1', name: 'D', image: '' }] });
    http.expectOne(base + '/musclesGroup/b').flush({ muscles: [{ _id: 'b1', name: 'B', image: '' }] });
    http.expectOne(base + '/musclesGroup/c').flush({ muscles: [] });

    const page = fixture.componentInstance;
    expect(page.muscleGroupTabs().map((tab) => tab.id)).toEqual(['b', 'd']);
    expect(page.selectedGroupId()).toBe('b');
    page.selectGroup('d');
    page.selectGroup('b');
    expect(page.muscles()[0]._id).toBe('b1');
    http.expectNone((request) => request.url.includes('/musclesGroup/'));
    fixture.destroy();
  });

  it('keeps failed groups visible and allows retry without classifying them as empty', () => {
    const fixture = TestBed.createComponent(ClassesPage);
    fixture.detectChanges();
    http.expectOne(base + '/muscles').flush({ musclesGroup: [{ _id: 'a', name: 'A' }] });
    http.expectOne(base + '/musclesGroup/a').flush(null, { status: 503, statusText: 'Unavailable' });
    const page = fixture.componentInstance;
    expect(page.muscleGroups()).toHaveLength(1);
    expect(page.groupLoadError()).toBe(true);
    expect(page.errorMessage()).toBe('workouts.error');
    http.expectNone(base + '/musclesGroup/a');
    page.selectGroup('a');
    http.expectOne(base + '/musclesGroup/a').flush({ muscles: [] });
    expect(page.muscleGroups()).toEqual([]);
    expect(page.selectedGroupId()).toBeNull();
    fixture.destroy();
  });

  it('keeps an all-empty response distinct from a failed response', () => {
    const fixture = TestBed.createComponent(ClassesPage);
    fixture.detectChanges();
    http.expectOne(base + '/muscles').flush({ musclesGroup: [{ _id: 'a', name: 'A' }] });
    http.expectOne(base + '/musclesGroup/a').flush({ muscles: [] });
    const page = fixture.componentInstance;
    expect(page.muscleGroups()).toEqual([]);
    expect(page.errorMessage()).toBeNull();
    expect(page.groupLoadError()).toBe(false);
    expect(page.isLoadingGroups()).toBe(false);
    fixture.destroy();
  });

  it('cancels an unresolved selection when another failed group is selected', () => {
    const fixture = TestBed.createComponent(ClassesPage);
    fixture.detectChanges();
    http.expectOne(base + '/muscles').flush({ musclesGroup: [{ _id: 'a', name: 'A' }, { _id: 'b', name: 'B' }] });
    for (const id of ['a', 'b']) {
      http.expectOne(base + '/musclesGroup/' + id).flush(null, { status: 503, statusText: 'Unavailable' });
    }
    const page = fixture.componentInstance;
    page.selectGroup('a');
    const stale = http.expectOne(base + '/musclesGroup/a');
    page.selectGroup('b');
    expect(stale.cancelled).toBe(true);
    http.expectOne(base + '/musclesGroup/b').flush({ muscles: [{ _id: 'b1', name: 'B', image: '' }] });
    expect(page.selectedGroupId()).toBe('b');
    expect(page.muscles()[0]._id).toBe('b1');
    fixture.destroy();
  });

  it('cancels stale language requests and preserves eligible selections using language-specific caches', () => {
    const fixture = TestBed.createComponent(ClassesPage);
    fixture.detectChanges();
    const groups = [{ _id: 'a', name: 'A' }, { _id: 'b', name: 'B' }];
    http.expectOne(base + '/muscles').flush({ musclesGroup: groups });
    const stale = http.expectOne(base + '/musclesGroup/a');
    const staleB = http.expectOne(base + '/musclesGroup/b');
    language.set('ar');
    fixture.detectChanges();
    expect(stale.cancelled).toBe(true);
    expect(staleB.cancelled).toBe(true);
    http.expectOne(base + '/muscles').flush({ musclesGroup: groups });
    http.expectOne(base + '/musclesGroup/a').flush({ muscles: [{ _id: 'a1', name: 'Arabic A', image: '' }] });
    http.expectOne(base + '/musclesGroup/b').flush({ muscles: [{ _id: 'b1', name: 'Arabic B', image: '' }] });
    fixture.componentInstance.selectGroup('b');
    language.set('en');
    fixture.detectChanges();
    http.expectOne(base + '/muscles').flush({ musclesGroup: groups });
    http.expectOne(base + '/musclesGroup/a').flush({ muscles: [{ _id: 'a1', name: 'English A', image: '' }] });
    http.expectOne(base + '/musclesGroup/b').flush({ muscles: [{ _id: 'b1', name: 'English B', image: '' }] });
    expect(fixture.componentInstance.selectedGroupId()).toBe('b');
    expect(fixture.componentInstance.muscles()[0].name).toBe('English B');
    language.set('ar');
    fixture.detectChanges();
    http.expectOne(base + '/muscles').flush({ musclesGroup: groups });
    http.expectNone((request) => request.url.includes('/musclesGroup/'));
    expect(fixture.componentInstance.muscles()[0].name).toBe('Arabic B');
    fixture.destroy();
  });
});
