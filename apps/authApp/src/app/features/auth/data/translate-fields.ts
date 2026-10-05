import { Signal, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { FieldConfig } from '@org/ui';

export function translateFields(fields: FieldConfig[]): Signal<FieldConfig[]> {
  const translate = inject(TranslateService);
  const refresh = toSignal(translate.onTranslationRefresh);
  const t = (key: string) => translate.instant(key) as string;

  return computed(() => {
    refresh();
    return fields.map((field) => ({
      ...field,
      label: t(field.label),
      placeholder: field.placeholder ? t(field.placeholder) : field.placeholder,
      validate: field.validate
        ? (value: unknown, model: Record<string, unknown>) => {
            const key = field.validate?.(value, model);
            return key ? t(key) : null;
          }
        : undefined,
    })) as FieldConfig[];
  });
}
