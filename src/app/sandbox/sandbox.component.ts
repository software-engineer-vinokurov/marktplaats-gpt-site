import { ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { connect } from '../../messaging';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { environment as devEnvironment } from '../../environments/environment.development';

@Component({
  selector: 'app-sandbox',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    MatSidenavModule,
    MatButtonModule,
    MatDividerModule,
    MatSlideToggleModule,
    FormsModule,
  ],
  templateUrl: './sandbox.component.html',
  styleUrl: './sandbox.component.css'
})
export class SandboxComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

  port?: any;

  isLoggingEnabled: boolean = false;
  isLocalhostApiServerEnabled: boolean = false;

  private startX?: number;
  private endX?: number;

  private _mobileQueryListener: () => void;

  @ViewChild(MatDrawer) drawer!: MatDrawer;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    try {
      // NOTE: Comm to extension works well in Chrome but in Safari only when normally installed bext (and m.b. not from localhost), see https://github.com/software-engineer-vinokurov/negotiate-ninja-browser-extension/issues/10
      this.port = connect();
      this.port?.onMessage.addListener((m: any) => {
        console.log("[sandbox] In port, received message from extension background script: ", m);
      });
    } catch (error) {
      console.log("[sandbox] Communication to extension background script failed:", error);
    }

    this.mobileQuery = media.matchMedia('(max-width: 700px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngAfterViewInit(): void {
    if (this.mobileQuery.matches) {
      this.drawer.close();
    } else {
      this.drawer.open();
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
  }

  onTouchEnd(event: TouchEvent) {
    this.endX = event.changedTouches[0].clientX;
    this.handleSwipe();
  }

  handleSwipe() {
    // Check if the swipe is to the right
    if (this.startX && this.endX && this.endX > (this.startX + 10)) {
      // Swipe to the right
      this.onRightSwipe();
    }
  }

  onRightSwipe() {
    // Your function to be called on right swipe
    this.drawer.toggle();
  }

  onLoggingChange() {
    this.port?.postMessage({
      task: 'enable-logging',
      enabled: this.isLoggingEnabled,
    });
  }

  onSetLocalhostApiServer() {
    this.port?.postMessage({
      task: 'use-api-server',
      url: this.isLocalhostApiServerEnabled ? devEnvironment.apiServer : environment.apiServer,
    });
  }


}
