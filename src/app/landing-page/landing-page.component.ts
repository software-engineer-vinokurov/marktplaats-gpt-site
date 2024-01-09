import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SubscribeFormComponent, ArrangedImagesComponent } from 'negotiate-ninja-lib';
import { environment } from '../../environments/environment';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

type CTAType = "signup" | "request-invite" | "subscribe";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    SubscribeFormComponent,
    ArrangedImagesComponent,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  cta: CTAType = "subscribe";

  constructor(public auth: AuthService, private router: Router,) {
    auth.isAuthenticated$.subscribe((v) => {
      if (v) {
        this.cta = "subscribe";
      } else {
        this.cta = environment.signup_enabled ? "signup" : "request-invite";
      }
    });
  }

  ngOnInit() {
    var video = document.getElementById("background-video") as HTMLVideoElement;
    video.oncanplaythrough = function () {
      video.muted = true;
      video.play();
    }
  }

  onSignup() {
    this.auth.loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
      },
      appState: {
        target: '/get-started',
      }
    })
  }

}
