import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Navbar } from './navbar';

describe('Navbar', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('shows the links', async () => {
    const fixture = TestBed.createComponent(Navbar);
    await fixture.whenStable();

    const links = fixture.nativeElement.querySelectorAll('.links a');
    expect(links.length).toBe(4);
  });

  it('opens and closes the menu', async () => {
    const fixture = TestBed.createComponent(Navbar);
    const host: HTMLElement = fixture.nativeElement;
    await fixture.whenStable();

    host.querySelector<HTMLButtonElement>('.menu-btn')!.click();
    await fixture.whenStable();
    expect(host.querySelector('.drawer')).not.toBeNull();

    host.querySelector<HTMLButtonElement>('.backdrop')!.click();
    await fixture.whenStable();
    expect(host.querySelector('.drawer')).toBeNull();
  });
});
