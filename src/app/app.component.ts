import { Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthService, GenericError } from '@auth0/auth0-angular';
import { config } from '../config';
import { filter, mergeMap } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    LandingPageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private intervalId: any;

  // Inject the authentication service into your component through the constructor
  constructor(@Inject(DOCUMENT) private doc: Document, public auth: AuthService,
  ) {
    auth.isAuthenticated$.subscribe(v => {
      // this.showAbout = !v
    });
  }

  showSignup = true;
  showLogin = false;

  ngOnInit(): void {
    this.auth.error$.pipe(
      filter((e) => e instanceof GenericError && e.error === 'login_required'),
      mergeMap(() => this.auth.loginWithRedirect())
    ).subscribe();

    this.intervalId = setInterval(() => {
      // switching Sign-up and Log-in buttons every 2 sec, as they both do not fitt in phone's screen vertical
      this.showSignup = !this.showSignup;
      this.showLogin = !this.showLogin;
    }, 1983);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  onLogin(): void {
    // Call this to redirect the user to the login page
    this.auth.loginWithRedirect({
      authorizationParams: {
        // TODO: try to remove here, as it can be enough to have it in appConfig
        audience: config.audience,
      }
    });
  }

  onLogout(): void {
    // Call this to redirect the user to the login page
    this.auth.logout({
      logoutParams: {
        returnTo: this.doc.location.origin
      }
    })
  }

}
