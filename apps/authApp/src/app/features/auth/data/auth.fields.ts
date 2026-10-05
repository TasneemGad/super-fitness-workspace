import { FieldConfig } from '@org/ui';
import { PASSWORD_PATTERN } from '@super-fitness/data-access-user';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function emailRule(value: unknown): string | null {
  return EMAIL_PATTERN.test(String(value)) ? null : 'Enter a valid email address.';
}

function passwordRule(value: unknown): string | null {
  return PASSWORD_PATTERN.test(String(value))
    ? null
    : 'At least 8 characters, with an uppercase, a lowercase, a number and a symbol.';
}

function minLengthRule(min: number) {
  return (value: unknown): string | null =>
    String(value).trim().length >= min ? null : `Must be at least ${min} characters.`;
}

export const LOGIN_FIELDS: FieldConfig[] = [
  {
    key: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Email',
    icon: 'email',
    autocomplete: 'email',
    hideLabel: true,
    required: true,
    validate: emailRule,
  },
  {
    key: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Password',
    icon: 'lock',
    autocomplete: 'current-password',
    hideLabel: true,
    required: true,
  },
];

export const FORGOT_PASSWORD_FIELDS: FieldConfig[] = [
  {
    key: 'email',
    type: 'email',
    label: 'auth.fields.email',
    placeholder: 'auth.fields.email',
    icon: 'email',
    autocomplete: 'email',
    hideLabel: true,
    required: true,
    validate: (value) => emailRule(value) && 'auth.validation.email',
  },
];

export const RESET_PASSWORD_FIELDS: FieldConfig[] = [
  {
    key: 'password',
    type: 'password',
    label: 'auth.fields.password',
    placeholder: 'auth.fields.password',
    icon: 'lock',
    autocomplete: 'new-password',
    hideLabel: true,
    required: true,
    validate: (value) => passwordRule(value) && 'auth.validation.password',
  },
  {
    key: 'rePassword',
    type: 'password',
    label: 'auth.fields.rePassword',
    placeholder: 'auth.fields.rePassword',
    icon: 'lock',
    autocomplete: 'new-password',
    hideLabel: true,
    required: true,
    validate: (value, model) =>
      value === model['password'] ? null : 'auth.validation.passwordMismatch',
  },
];

export const REGISTER_ACCOUNT_FIELDS: FieldConfig[] = [
  {
    key: 'firstName',
    type: 'text',
    label: 'First Name',
    placeholder: 'First Name',
    icon: 'user',
    autocomplete: 'given-name',
    hideLabel: true,
    required: true,
    validate: minLengthRule(2),
  },
  {
    key: 'lastName',
    type: 'text',
    label: 'Last Name',
    placeholder: 'Last Name',
    icon: 'user',
    autocomplete: 'family-name',
    hideLabel: true,
    required: true,
    validate: minLengthRule(2),
  },
  {
    key: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Email',
    icon: 'email',
    autocomplete: 'email',
    hideLabel: true,
    required: true,
    validate: emailRule,
  },
  {
    key: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Password',
    icon: 'lock',
    autocomplete: 'new-password',
    hideLabel: true,
    required: true,
    validate: passwordRule,
  },
];

