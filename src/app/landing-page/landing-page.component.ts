import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SubscribeFormComponent, ArrangedImagesComponent, RequestInviteFormComponent, InviteRequestedEvent } from 'negotiate-ninja-lib';
import { environment } from '../../environments/environment';
import { AuthService } from '@auth0/auth0-angular';

type CTAType = "signup" | "request-invite" | "subscribe";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    SubscribeFormComponent,
    RequestInviteFormComponent,
    ArrangedImagesComponent,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  cta!: CTAType;

  constructor(public auth: AuthService,) {
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

  onRequest(e: InviteRequestedEvent) {
    console.log("NOT IMPLEMENTED", e)
  }

  onSignup() {
    this.auth.loginWithPopup({
      authorizationParams: {
        screen_hint: 'signup'
      }
    });
  }

}
