import { NgComponentOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  Type,
} from '@angular/core';
import { DumbbellIcon } from '../icons/dumbbell-icon/dumbbell-icon';

export type SectionTitleSize = 'sm' | 'md' | 'lg';
export type SectionTitleLabelAlign = 'start' | 'center';

// The whole composition is sized in `em` off this one font-size, so every size
// keeps the same proportions. Full class strings so Tailwind can see them.
const SIZES: Record<SectionTitleSize, string> = {
  sm: 'text-[clamp(2.25rem,9vw,6.5rem)]',
  md: 'text-[clamp(2.5rem,14vw,11rem)]',
  lg: 'text-[clamp(2.5rem,14vw,14rem)]',
};

const LABEL_ALIGN: Record<SectionTitleLabelAlign, string> = {
  start: 'justify-self-start ms-[0.17em]',
  center: 'justify-self-center',
};

/**
 * Section banner: a large, faint outlined word with a small accent icon + label
 * tucked under its leading edge. Parents supply the content; this owns the look.
 *
 * The icon defaults to the brand dumbbell. Any standalone component can replace
 * it; it is sized by `font-size` (1em tall) and coloured by `currentColor`.
 * Set `showIcon` to false to hide it.
 *
 * `labelAlign` puts the icon + label at the word's start (default) or centre.
 * `padding` / `margin` take any CSS value and override the default spacing.
 * Fonts: Nunito 900 and Ubuntu 700 must be loaded by the host app.
 */
@Component({
  selector: 'lib-section-title',
  imports: [NgComponentOutlet],
  templateUrl: './section-title.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block overflow-hidden px-3 [--st-bg:#f2f2f3] bg-(--st-bg)',
    '[style.padding]': 'padding()',
    '[style.margin]': 'margin()',
  },
})
export class SectionTitle {
  primaryText = input.required<string>();
  secondaryText = input<string>();
  icon = input<Type<unknown>>(DumbbellIcon);
  showIcon = input(true, { transform: booleanAttribute });
  size = input<SectionTitleSize>('md');
  labelAlign = input<SectionTitleLabelAlign>('start');
  padding = input<string>();
  margin = input<string>();

  protected readonly sizeClass = computed(() => SIZES[this.size()]);
  protected readonly labelAlignClass = computed(
    () => LABEL_ALIGN[this.labelAlign()],
  );
}
