import { InjectionToken } from '@angular/core';
import { FieldConfig } from '@org/ui';
import {
  REGISTER_BODY_FIELDS,
  REGISTER_GOAL_FIELDS,
  REGISTER_PROFILE_FIELDS,
} from '../data/auth.fields';
import { RegisterStepDefinition } from './register-stepper';
import { RegisterAccountStep } from './steps/account-step/register-account-step';
import { RegisterDetailsStep } from './steps/details-step/register-details-step';

const keysOf = (fields: FieldConfig[]) => fields.map((f) => f.key);

function detailsStep(
  id: string,
  title: string,
  heading: string,
  fields: FieldConfig[]
): RegisterStepDefinition {
  return {
    id,
    title,
    component: RegisterDetailsStep,
    inputs: { heading, fields },
    keys: keysOf(fields),
  };
}

export const DEFAULT_REGISTER_STEPS: readonly RegisterStepDefinition[] = [
  {
    id: 'account',
    eyebrow: 'Hey There',
    title: 'Create An Account',
    component: RegisterAccountStep,
    keys: ['firstName', 'lastName', 'email', 'password', 'rePassword'],
  },
  detailsStep('profile', 'Tell Us About You', 'Your Profile', REGISTER_PROFILE_FIELDS),
  detailsStep('body', 'Your Measurements', 'Body Stats', REGISTER_BODY_FIELDS),
  detailsStep('goal', 'Set Your Goal', 'Fitness Goal', REGISTER_GOAL_FIELDS),
];

export const REGISTER_STEPS = new InjectionToken<readonly RegisterStepDefinition[]>(
  'REGISTER_STEPS',
  { providedIn: 'root', factory: () => DEFAULT_REGISTER_STEPS }
);
