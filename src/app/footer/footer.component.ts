import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TosDialog } from 'negotiate-ninja-lib';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    TosDialog,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  dynamicStyle?: string = "opacity: 10%;";

  constructor(
    public dialog: MatDialog
  ) { }

  recalcOpacity() {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    const start_from = max * 0.8;
    const opacity = Math.max(0, Math.round((100 * (pos - start_from)) / (max - start_from)));
    this.dynamicStyle = `opacity: ${opacity}%;`;
    if (opacity > 0) {
      this.dynamicStyle = `opacity: ${opacity}%;`;
    } else {
      this.dynamicStyle = `visibility: hidden;`;
    }
    // console.log(`pos: ${pos} max: ${max} footerOpacity: ${this.footerOpacity}`);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    this.recalcOpacity();
  }

  ngOnInit() {
    setTimeout(() =>
      this.recalcOpacity(),
      0
    );
  }

  openTermsDialog() {
    const dialogRef = this.dialog.open(TosDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
