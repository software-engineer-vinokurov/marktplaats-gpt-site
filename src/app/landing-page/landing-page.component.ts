import { Component, ElementRef, ViewChild } from '@angular/core';
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

  @ViewChild('chromeSymbolRef', { static: true }) chromeSymbolRef!: ElementRef;
  @ViewChild('inChromeTitleRef', { static: true }) inChromeTitleRef!: ElementRef;
  @ViewChild('safariSymbolRef', { static: true }) safariSymbolRef!: ElementRef;
  @ViewChild('inSafariTitleRef', { static: true }) inSafariTitleRef!: ElementRef;


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
    };

    [
      [this.chromeSymbolRef, this.inChromeTitleRef],
      [this.safariSymbolRef, this.inSafariTitleRef],
    ].forEach((x) => {
      const [symRef, stopRef] = x;
      const e = symRef.nativeElement as HTMLElement;
      const stopE = stopRef.nativeElement as HTMLElement;
      const stopAtX = stopE.getBoundingClientRect().x;
      console.log(stopAtX);
      e.onload = function () {
        window.addEventListener('resize', () => {
          translateSymbol(e, stopAtX);
        });
        window.addEventListener('scroll', () => {
          translateSymbol(e, stopAtX);
        });
        translateSymbol(e, stopAtX);
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
    })
  }

}



const translateSymbol = (e: HTMLElement, stopAtX: number) => {
  const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
  const max = document.documentElement.scrollHeight;

  // Recetting transformation to measure original position properly
  e.style.transform = `
    translate(0,0)
  `;

  const eY = e.getBoundingClientRect().y;
  const x = Math.max(stopAtX, eY * document.documentElement.offsetWidth / document.documentElement.offsetHeight);

  function f(x: number): number {
    const scaleX = document.documentElement.offsetWidth / 20; // 20 small oscillations for whole width of screen
    const scaleY = 80 * Math.sin(Math.PI * x / document.documentElement.offsetWidth); // one big oscillation with max at center of the screen
    return scaleY * Math.cos(x / scaleX);
  }

  const y = f(x);
  e.style.transform = `
    translate(${x}px, ${y}px)
  `;
}