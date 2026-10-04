/**
 * Centralised configuration for the three numeric onboarding steps.
 *
 * Every property that could vary per step (title, range, field key,
 * next route) lives here.  The page components read this constant and
 * pass it down to NumericRegistrationStep — they own no logic.
 *
 * Adding a new numeric step: add an entry here, create a one-liner page,
 * and register the route.  Nothing else needs to change.
 */

export interface NumericOnboardingStepConfig {
  /** Stable identifier (used in analytics / tests). */
  readonly id: string;
  /** 1-based display position in the full flow (e.g. 2 → "2 / 6"). */
  readonly currentStep: number;
  /** Total number of steps in the registration flow. */
  readonly totalSteps: number;
  /** i18n key for the question title. */
  readonly titleKey: string;
  /** i18n key for the supporting description. */
  readonly descriptionKey: string;
  /** i18n key for the unit label shown above the wheel. */
  readonly unitKey: string;
  /** i18n key for the "Next" button label. */
  readonly nextLabelKey: string;
  /** The key used to persist the value in RegistrationFlowService. */
  readonly field: string;
  /** Minimum selectable value (inclusive). */
  readonly min: number;
  /** Maximum selectable value (inclusive). */
  readonly max: number;
  /** Increment between adjacent wheel items. */
  readonly step: number;
  /** Pre-selected value when the user has not yet visited this step. */
  readonly defaultValue: number;
  /** Relative router path to navigate to when "Next" is tapped. */
  readonly nextRoute: string;
}

export const TOTAL_REGISTER_STEPS = 6 as const;

export const NUMERIC_ONBOARDING_STEPS = {
  age: {
    id: 'age',
    currentStep: 2,
    totalSteps: TOTAL_REGISTER_STEPS,
    titleKey: 'auth.register.age.title',
    descriptionKey: 'auth.register.age.description',
    unitKey: 'auth.register.age.unit',
    nextLabelKey: 'auth.register.common.next',
    field: 'age',
    min: 10,
    max: 100,
    step: 1,
    defaultValue: 25,
    nextRoute: '../weight',
  },
  weight: {
    id: 'weight',
    currentStep: 3,
    totalSteps: TOTAL_REGISTER_STEPS,
    titleKey: 'auth.register.weight.title',
    descriptionKey: 'auth.register.weight.description',
    unitKey: 'auth.register.weight.unit',
    nextLabelKey: 'auth.register.weight.next',
    field: 'weight',
    min: 30,
    max: 200,
    step: 1,
    defaultValue: 70,
    nextRoute: '../height',
  },
  height: {
    id: 'height',
    currentStep: 4,
    totalSteps: TOTAL_REGISTER_STEPS,
    titleKey: 'auth.register.height.title',
    descriptionKey: 'auth.register.height.description',
    unitKey: 'auth.register.height.unit',
    nextLabelKey: 'auth.register.common.next',
    field: 'height',
    min: 100,
    max: 220,
    step: 1,
    defaultValue: 175,
    nextRoute: '../profile',
  },
} as const satisfies Record<string, NumericOnboardingStepConfig>;
