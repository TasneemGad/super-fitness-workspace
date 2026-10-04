import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'lib-question-title',
  templateUrl: './question-title.html',
  styleUrl: './question-title.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionTitle {
  text = input.required<string>();
}
