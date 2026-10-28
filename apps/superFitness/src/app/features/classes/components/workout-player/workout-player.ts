import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { getYouTubeThumbnailUrl, getYouTubeVideoId } from '../../utils/youtube-video.utils';

@Component({
  selector: 'app-workout-player',
  standalone: true,
  imports: [],
  templateUrl: './workout-player.html',
  styleUrl: './workout-player.scss',
})
export class WorkoutPlayer {
private readonly sanitizer = inject(DomSanitizer);

readonly title = input.required<string>();
readonly videoUrl = input<string | null>(null);
readonly level = input<string>('');
readonly duration = input<string>('');
readonly muscleImage = input<string | null>(null);

readonly isPlaying = signal(false);

constructor() {
  effect(() => {
    this.videoUrl();           
    this.isPlaying.set(false);  
  });
}

private readonly videoId = computed(() => getYouTubeVideoId(this.videoUrl()));

readonly poster = computed(() => {
  return (
    this.muscleImage() ??
    getYouTubeThumbnailUrl(this.videoUrl()) ??
    ''
  );
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
