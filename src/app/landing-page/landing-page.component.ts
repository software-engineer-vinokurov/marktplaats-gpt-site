import { Component } from '@angular/core';
import { SubscribeFormComponent } from 'negotiate-ninja-lib';
import { ArrangedImagesComponent } from '../arranged-images/arranged-images.component';

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
