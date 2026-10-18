import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, computed, inject, input, TemplateRef } from '@angular/core';
import { LanguageService } from '@org/i18n';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-owl-carousel',
  standalone: true,
  imports: [CarouselModule, NgTemplateOutlet],
  templateUrl: './owl-carousel.component.html',
  styleUrl: './owl-carousel.component.scss',
})
export class OwlCarouselComponent<T> {

  private readonly languageService = inject(LanguageService);
  

  readonly items = input.required<T[]>(); 
  readonly options = input.required<OwlOptions>();
  readonly itemId = input.required<(item: T) => string>();

  readonly rows = input<number>(1);
  readonly slides = computed(() => {
    const rows = Math.max(1, this.rows());
    const items = this.items();
    const groups: T[][] = [];
    for (let i = 0; i < items.length; i += rows) {
      groups.push(items.slice(i, i + rows));
    }
    return groups;
  });
  readonly slideId = (group: T[]) => group.map((i) => this.itemId()(i)).join('-');


  // Always follow the current document direction; re-inits the carousel when the language changes
  readonly carouselOptions = computed<OwlOptions>(() => ({
    ...this.options(),
    rtl: this.languageService.isRtl(),
    navText:['', ''],
  }));

   @ContentChild('slide', { read: TemplateRef })
  slideTemplate!: TemplateRef<{ $implicit: T }>;
}
