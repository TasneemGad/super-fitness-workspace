import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-workout-player',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './workout-player.html',
  styleUrl: './workout-player.scss',
})
export class WorkoutPlayer {
private readonly sanitizer = inject(DomSanitizer);

readonly title = input.required<string>();
readonly description = input<string>('');
readonly videoUrl = input<string | null>(null);
readonly level = input<string>('');
readonly duration = input<string>('');

readonly isPlaying = signal(false);

constructor() {
  effect(() => {
    this.videoUrl();           
    this.isPlaying.set(false);  
  });
}

// Extracts the 11-character YouTube video ID from the supplied URL.
private readonly videoId=computed(() => {
  const url = this.videoUrl();
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|v=)([\w-]{11})/);
  return match ? match[1] : null;
  });

// Builds the YouTube thumbnail URL (img)for the current video.
readonly poster = computed(() => {
  const id = this.videoId();
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '';
});
// Creates a trusted YouTube embed URL that starts playback automatically.
readonly embedUrl = computed(() => {
  const id = this.videoId();
  return id
    ? this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`,
      )
    : null;
});

play(): void {
  if (this.videoId()) this.isPlaying.set(true);
}
}
