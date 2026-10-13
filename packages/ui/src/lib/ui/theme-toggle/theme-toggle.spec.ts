import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThemeService } from '../../theme/theme.service';
import { FieldIcon } from '../icon/field-icon';
import { ThemeToggle } from './theme-toggle';

describe('ThemeToggle', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [ThemeToggle],
    }).compileComponents();
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('shows the destination icon and accessible label when toggled', () => {
    const fixture = TestBed.createComponent(ThemeToggle);
    fixture.detectChanges();
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    const icon = fixture.debugElement.query(By.directive(FieldIcon))
      .componentInstance as FieldIcon;
    expect(icon.name()).toBe('sun');
    expect(button.getAttribute('aria-label')).toBe('Switch to light mode');
    button.click();
    fixture.detectChanges();
    expect(TestBed.inject(ThemeService).theme()).toBe('light');
    expect(icon.name()).toBe('moon');
    expect(button.getAttribute('aria-label')).toBe('Switch to dark mode');
    button.click();
    fixture.detectChanges();
    expect(icon.name()).toBe('sun');
    expect(
      fixture.nativeElement.querySelector('path').getAttribute('d'),
    ).toBeTruthy();
  });

  it('uses an enabled native button with a decorative icon and no visible label', () => {
    const fixture = TestBed.createComponent(ThemeToggle);
    fixture.detectChanges();
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    expect(button.type).toBe('button');
    expect(button.disabled).toBe(false);
    expect(button.tabIndex).toBe(0);
    expect(button.textContent?.trim()).toBe('');
    expect(button.hasAttribute('title')).toBe(false);
    expect(button.querySelector('svg')?.getAttribute('aria-hidden')).toBe(
      'true',
    );
    document.body.appendChild(fixture.nativeElement);
    button.focus();
    expect(document.activeElement).toBe(button);
    fixture.nativeElement.remove();
  });

  it('shares one service across controls and follows external theme changes', () => {
    const first = TestBed.createComponent(ThemeToggle);
    const second = TestBed.createComponent(ThemeToggle);
    first.detectChanges();
    second.detectChanges();
    first.nativeElement.querySelector('button').click();
    second.detectChanges();
    expect(
      second.nativeElement.querySelector('button').getAttribute('aria-label'),
    ).toBe('Switch to dark mode');
    TestBed.inject(ThemeService).setTheme('dark');
    first.detectChanges();
    second.detectChanges();
    expect(
      first.nativeElement.querySelector('button').getAttribute('aria-label'),
    ).toBe('Switch to light mode');
    expect(
      second.nativeElement.querySelector('button').getAttribute('aria-label'),
    ).toBe('Switch to light mode');
  });
});
