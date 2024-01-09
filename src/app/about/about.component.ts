import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SubscribeFormComponent } from 'negotiate-ninja-lib';
import { environment } from '../../environments/environment';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

type CTAType = "signup" | "request-invite" | "subscribe";

@Component({
  selector: 'nn-about',
  standalone: true,
  imports: [
    RouterModule,
    MatIconModule,
    MatButtonModule,
    SubscribeFormComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  cta: CTAType = "subscribe";

  constructor(public auth: AuthService,) {
    auth.isAuthenticated$.subscribe((v) => {
      if (v) {
        this.cta = "subscribe";
      } else {
        this.cta = environment.signup_enabled ? "signup" : "request-invite";
      }
    });
  }

  onSignup() {
    this.auth.loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
      },
      appState: {
        target: '/get-started',
      }
    });
  }

}
