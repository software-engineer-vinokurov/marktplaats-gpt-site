import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  footerOpacity?: string = "opacity: 100%;";

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    this.footerOpacity = `opacity: ${Math.round((100 * pos) / max)}%;`;
    console.log(`pos: ${pos} max: ${max} footerOpacity: ${this.footerOpacity}`);
  }
}
