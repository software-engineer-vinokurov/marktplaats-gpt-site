import { Component } from '@angular/core';
import { SubscribeFormComponent, ArrangedImagesComponent } from 'negotiate-ninja-lib';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    SubscribeFormComponent,
    ArrangedImagesComponent,
  ],
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
