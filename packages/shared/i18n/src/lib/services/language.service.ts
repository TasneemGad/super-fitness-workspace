import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type AppLanguage = 'en' | 'ar';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translateService = inject(TranslateService);
  private readonly defaultLanguage: AppLanguage = 'en';

  readonly currentLang = signal<AppLanguage>(this.defaultLanguage)

  init() {
    const savedLanguage = localStorage.getItem('lang');
    const language: AppLanguage =savedLanguage === 'ar' ? 'ar' : 'en';
    return this.switchLanguage(language);
  }


  switchLanguage(language: AppLanguage) {
     this.currentLang.set(language);

     localStorage.setItem('lang', language);
     this.setDirection(language);

     return this.translateService.use(language);
     
  }

  private setDirection(language: AppLanguage) :void{
    const dir = language === 'ar' ? 'rtl' : 'ltr';

    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  } 
}
