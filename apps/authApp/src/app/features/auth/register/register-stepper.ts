import { InjectionToken, Signal, Type } from '@angular/core';

export type RegistrationDraft = Record<string, unknown>;

export interface RegisterStepDefinition {
  id: string;

  title: string;

  eyebrow?: string;

  component: Type<unknown>;

  inputs?: Record<string, unknown>;

  keys: readonly string[];
}

export interface RegisterStepper {
  readonly draft: Signal<RegistrationDraft>;

  readonly index: Signal<number>;
  readonly count: Signal<number>;
  readonly isFirst: Signal<boolean>;
  readonly isLast: Signal<boolean>;

  readonly submitting: Signal<boolean>;
  readonly errors: Signal<readonly string[]>;

  next(values: RegistrationDraft): void;
  back(): void;
}

export const REGISTER_STEPPER = new InjectionToken<RegisterStepper>(
  'REGISTER_STEPPER'
);

export function keysInErrors(errors: readonly string[]): string[] {
  return errors.flatMap((message) =>
    [...message.matchAll(/"(\w+)"/g)].map((match) => match[1])
  );
}
