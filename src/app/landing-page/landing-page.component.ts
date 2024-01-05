import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  ngOnInit() {
    var video = document.getElementById("background-video") as HTMLVideoElement;
    video.oncanplaythrough = function () {
      video.muted = true;
      video.play();
    }
  }

}
