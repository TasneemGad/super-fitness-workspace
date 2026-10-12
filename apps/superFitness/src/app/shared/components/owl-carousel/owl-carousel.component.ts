import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, input, TemplateRef } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-owl-carousel',
  standalone: true,
  imports: [CarouselModule , NgTemplateOutlet],
  templateUrl: './owl-carousel.component.html',
  styleUrl: './owl-carousel.component.scss',
})
export class OwlCarouselComponent<T> {
  readonly items = input.required<T[]>(); 
  readonly options = input.required<OwlOptions>();
  readonly itemId = input.required<(item: T) => string>();

   @ContentChild('slide', { read: TemplateRef })
  slideTemplate!: TemplateRef<{ $implicit: T }>;
}
