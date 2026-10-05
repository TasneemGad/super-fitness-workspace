import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { AuthRepository } from '@super-fitness/data-access-user';
import { EMPTY } from 'rxjs';
import { RegistrationFlowService } from '../../services/registration-flow.service';
import { RegisterGoalPage } from './register-goal.page';

describe('RegisterGoalPage', () => {
  let fixture: ComponentFixture<RegisterGoalPage>;
  let flowService: RegistrationFlowService;
  let signup: ReturnType<typeof vi.fn>;
  let navigate: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    signup = vi.fn(() => EMPTY);

    await TestBed.configureTestingModule({
      imports: [RegisterGoalPage],
      providers: [
        provideRouter([]),
        {
          provide: AuthRepository,
          useValue: { signup, signin: vi.fn(() => EMPTY) },
        },
      ],
    }).compileComponents();

    flowService = TestBed.inject(RegistrationFlowService);
    navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    fixture = TestBed.createComponent(RegisterGoalPage);
    fixture.detectChanges();
  });

  it('renders the goal form and submits the accumulated registration draft', () => {
    const values = { goal: 'get fitter', activityLevel: 'level3' };

    expect(
      fixture.nativeElement.querySelector('app-register-details-step'),
    ).toBeTruthy();
    fixture.componentInstance.next(values);

    expect(flowService.draft()).toEqual(values);
    expect(signup).toHaveBeenCalledWith(
      expect.objectContaining({
        goal: 'get fitter',
        activityLevel: 'level3',
      }),
    );
    expect(navigate).not.toHaveBeenCalled();
  });

  it('returns to the height step when going back', () => {
    fixture.componentInstance.back();

    expect(navigate).toHaveBeenCalledWith(['../height'], {
      relativeTo: expect.anything(),
    });
  });
});
