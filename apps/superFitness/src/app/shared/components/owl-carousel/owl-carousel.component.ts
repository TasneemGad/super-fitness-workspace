import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, computed, inject, input, TemplateRef } from '@angular/core';
import { LanguageService } from '@org/i18n';
import { FieldIcon } from '@org/ui';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-owl-carousel',
  standalone: true,
  imports: [CarouselModule, NgTemplateOutlet, FieldIcon],
  templateUrl: './owl-carousel.component.html',
  styleUrl: './owl-carousel.component.scss',
})
export class OwlCarouselComponent<T> {

  private readonly languageService = inject(LanguageService);
  

  readonly items = input.required<T[]>(); 
  readonly options = input.required<OwlOptions>();
  readonly itemId = input.required<(item: T) => string>();

  // Always follow the current document direction; re-inits the carousel when the language changes
  readonly carouselOptions = computed<OwlOptions>(() => ({
    ...this.options(),
    rtl: this.languageService.isRtl(),
    navText:['', ''],
  }));

   @ContentChild('slide', { read: TemplateRef })
  slideTemplate!: TemplateRef<{ $implicit: T }>;
}
