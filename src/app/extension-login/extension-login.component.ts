import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-extension-login',
  standalone: true,
  imports: [
  ],
  templateUrl: './extension-login.component.html',
  styleUrl: './extension-login.component.css'
})
export class ExtensionLoginComponent {

  redirect_url?: string;
  url_back!: string;
  debugFlow = false; // will show snack bar to stay on the page

  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    const hash = window.location.hash;
    this.redirect_url = hash.substring(1);

    if (this.redirect_url.startsWith("safari-web-extension://") || this.redirect_url.startsWith("chrome-extension://")) {
      this.route.url.subscribe(url => {
        // The URL is an array of segments, join them to get a string
        const currentRoute = url.map(segment => segment.path).join('/');

        if (currentRoute === "extension/login") {
          auth.isAuthenticated$.subscribe(v => {
            auth.user$.subscribe(u => {
              auth.getAccessTokenSilently().subscribe(access_token => {
                const params = {
                  name: u?.name,
                  picture: u?.picture,
                  access_token: access_token,
                }

                const queryString = Object.entries(params)
                  .filter(([k, v]) => v !== undefined && v !== null)
                  .map(([k, v]) => `${k}=${encodeURIComponent(v!)}`)
                  .join('&');

                this.url_back = this.redirect_url! + "?" + queryString;

                if (this.debugFlow) {
                  let snackBarRef = this.snackBar.open('Logged-in', 'Return to extension page', {
                  });
                  snackBarRef.onAction().subscribe(() => { this.goBack(); });
                } else {
                  this.goBack();
                }
              });
            });
          });
        } else if (currentRoute === "extension/signup") {
          // TODO: implement signup + return back to ext. flow
        } else if (currentRoute === "extension/logout") {
          auth.logout({
            logoutParams: {
              returnTo: window.location.origin
            }
          });
        }
      });
    } else {
      alert("Not supported: " + this.redirect_url);
    }
  }

  goBack() {
    window.location.href = this.url_back;
  }
}
