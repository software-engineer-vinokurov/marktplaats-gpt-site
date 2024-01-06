import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SubscribeFormComponent } from 'negotiate-ninja-lib';

@Component({
  selector: 'nn-about',
  standalone: true,
  imports: [
    RouterModule,
    SubscribeFormComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
