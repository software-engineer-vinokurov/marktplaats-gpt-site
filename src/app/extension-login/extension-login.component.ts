import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-extension-login',
  standalone: true,
  imports: [],
  templateUrl: './extension-login.component.html',
  styleUrl: './extension-login.component.css'
})
export class ExtensionLoginComponent {

  redirect_url?: string;

  constructor(public auth: AuthService, private route: ActivatedRoute) {
    const hash = window.location.hash;
    this.redirect_url = hash.substring(1);

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

              window.location.href = this.redirect_url! + "?" + queryString;
            });
          });
        });
      } else if (currentRoute === "extension/signup") {
        // TODO: add extension/signup support
      } else if (currentRoute === "extension/logout") {
        auth.logout();
      }
    });


  }
}
