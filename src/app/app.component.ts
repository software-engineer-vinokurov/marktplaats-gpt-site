import { Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthService } from '@auth0/auth0-angular';
import { SuggestionsService } from './suggestions.service';


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
    LandingPageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // Inject the authentication service into your component through the constructor
  constructor(@Inject(DOCUMENT) private doc: Document, public auth: AuthService, private suggestionsService: SuggestionsService,
  ) {
    auth.isAuthenticated$.subscribe(v => {
      // this.showAbout = !v
    });
  }

  onLogin(): void {
    // Call this to redirect the user to the login page
    this.auth.loginWithRedirect();
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
