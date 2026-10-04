import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

/**
 * Circular arc progress ring showing "current / total" steps.
 *
 * The arc fills clockwise from 12 o'clock, proportional to current / total.
 *
 * Usage:
 *   <lib-step-progress [current]="2" [total]="6" />
 *
 * CSS custom properties for theming:
 *   --stp-size        host width & height (default: 56px)
 *   --stp-accent      arc stroke colour   (default: var(--auth-accent, #ff4100))
 *   --stp-track       background ring     (default: rgba(255,255,255,.12))
 *   --stp-label-color label text colour   (default: white)
 */
@Component({
  selector: 'lib-step-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg class="stp-ring" viewBox="0 0 56 56" aria-hidden="true">
      <circle class="stp-ring__bg" cx="28" cy="28" r="22" />
      <circle
        class="stp-ring__arc"
        cx="28"
        cy="28"
        r="22"
        [attr.stroke-dashoffset]="dashOffset()"
      />
    </svg>
    <span
      class="stp-label"
      [attr.aria-label]="'Step ' + current() + ' of ' + total()"
    >
      {{ current() }}<span class="stp-sep" aria-hidden="true">/</span>{{ total() }}
    </span>
  `,
  styleUrl: './step-progress.css',
  host: { class: 'stp' },
})
export class StepProgress {
  current = input.required<number>();
  total = input.required<number>();

  /** 2 × π × r where r = 22 → ≈ 138.23 */
  private readonly CIRCUMFERENCE = 2 * Math.PI * 22;

  protected readonly dashOffset = computed(
    () => this.CIRCUMFERENCE * (1 - this.current() / this.total()),
  );
}
