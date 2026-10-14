import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

export function provideI18n() {
  return provideTranslateService({
    loader: provideTranslateHttpLoader({
      prefix: '/assets/i18n/',
      suffix: '.json',
    }),
    fallbackLang: 'en',
    lang: 'en',
  });
}