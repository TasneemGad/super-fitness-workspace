import { Component, inject } from '@angular/core';
import { FieldIcon } from '@org/ui';
import { AppLanguage, LanguageService } from '../../services/language.service';

@Component({
  selector: 'lib-language-switcher',
  imports: [FieldIcon],
  templateUrl: './language-switcher.html',
})
export class LanguageSwitcher {
  private readonly languageService = inject(LanguageService);
  readonly currentLang = this.languageService.currentLang;

  readonly toggleLanguage = () => {
    const nextLanguage: AppLanguage =
      this.currentLang() === 'en' ? 'ar' : 'en';

    this.languageService.switchLanguage(nextLanguage);
  };
}
