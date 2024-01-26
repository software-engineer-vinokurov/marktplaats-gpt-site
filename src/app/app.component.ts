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
import { AuthService, GenericError, User } from '@auth0/auth0-angular';
import { filter, map } from 'rxjs';
import { environment } from '../environments/environment';
import { FooterComponent } from './footer/footer.component';
import { connect } from '../messaging'
import { MatSnackBar } from '@angular/material/snack-bar';


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
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private intervalId: any;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    public auth: AuthService,
    private snackBar: MatSnackBar,
  ) {
    auth.isAuthenticated$.subscribe(v => {
      auth.user$.subscribe(user => {
        auth.getAccessTokenSilently().subscribe(access_token => {
          this.commToExtension(access_token, user);
        });
      });
    });
  }

  isAdmin(user: User) {
    return user.sub === environment.auth0_admin_user_id;
  }

  isTester(user: User) {
    return user.email?.endsWith("@aleksandr.vin");
  }

  commToExtension(
    access_token: string,
    user?: User | null) {
    // NOTE: Comm to extension works well in Chrome but in Safari only when normally installed bext (and m.b. not from localhost), see https://github.com/software-engineer-vinokurov/negotiate-ninja-browser-extension/issues/10
    try {
      let port = connect();
      port?.onMessage.addListener((m: any) => {
        // console.log("In port, received message from extension background script:", m);
      });
      port?.postMessage({
        task: 'store-access-token',
        access_token: access_token,
      });
      if (user) {
        port?.postMessage({
          task: 'store-user',
          user: user,
        });
      }
    } catch (error) {
      // console.log("Communication to extension background script failed:", error);
    }
  }

  showSignup = true;
  showLogin = false;

  ngOnInit(): void {
    this.auth.error$.pipe(
      filter((e) => e instanceof GenericError && e.error === 'login_required'),
      map((e: Error) => {
        if (false) { // FIXME: disabling it as it nags on every page if not logged-in
          let snackBarRef = this.snackBar.open((e as GenericError).error_description, 'Login', {
            duration: 3000
          });
          snackBarRef.onAction().subscribe(() => this.auth.loginWithRedirect());
        }
      }
      )
    ).subscribe();

    if (environment.signup_enabled) {
      this.intervalId = setInterval(() => {
        // switching Sign-up and Log-in buttons every 2 sec, as they both do not fitt in phone's screen vertical
        this.showSignup = !this.showSignup;
        this.showLogin = !this.showLogin;
      }, 1983);
    } else {
      this.showSignup = false;
      this.showLogin = true;
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  onLogin(): void {
    // Call this to redirect the user to the login page
    this.auth.loginWithPopup({
      authorizationParams: {
        screen_hint: 'login'
      }
    });
  }

  onSignup(): void {
    // Call this to redirect the user to the login page
    this.auth.loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
      },
      appState: {
        target: '/get-started/new-user',
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
