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

  footerOpacity?: string = "opacity: 10%;";

  constructor(
    public dialog: MatDialog
  ) { }

  recalcOpacity() {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    this.footerOpacity = `opacity: ${Math.round((100 * pos) / max)}%;`;
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
