import { ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-sandbox',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    MatSidenavModule,
    MatButtonModule,
    MatDividerModule
  ],
  templateUrl: './sandbox.component.html',
  styleUrl: './sandbox.component.css'
})
export class SandboxComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  @ViewChild(MatDrawer) drawer!: MatDrawer;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
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
}
