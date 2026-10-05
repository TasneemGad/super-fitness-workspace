import { InjectionToken } from '@angular/core';
import { FieldConfig } from '@org/ui';
import {
  REGISTER_BODY_FIELDS,
  REGISTER_GOAL_FIELDS,
  REGISTER_PROFILE_FIELDS,
} from '../data/auth.fields';
import { RegisterStepDefinition } from './register-stepper';
import { RegisterAccountStep } from './steps/account-step/register-account-step';

const keysOf = (fields: FieldConfig[]) => fields.map((f) => f.key);

export const DEFAULT_REGISTER_STEPS: readonly RegisterStepDefinition[] = [
  {
    id: 'account',
    eyebrow: 'Hey There',
    title: 'Create An Account',
    component: RegisterAccountStep,
    keys: ['firstName', 'lastName', 'email', 'password', 'rePassword'],
  },

];

export const REGISTER_STEPS = new InjectionToken<readonly RegisterStepDefinition[]>(
  'REGISTER_STEPS',
  { providedIn: 'root', factory: () => DEFAULT_REGISTER_STEPS }
);
