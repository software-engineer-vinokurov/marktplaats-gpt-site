import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-personal-invite',
  standalone: true,
  imports: [
    MatButtonModule,
  ],
  templateUrl: './personal-invite.component.html',
  styleUrl: './personal-invite.component.css'
})
export class PersonalInviteComponent {

  email!: string;
  ticket!: string;

  private route: ActivatedRoute = inject(ActivatedRoute);

  constructor(private router: Router,) { }

  ngOnInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const [email, ticket] = JSON.parse(atob(fragment));
        this.email = email
        this.ticket = ticket
      }
    })
  }

  onSetPassword(): void {
    window.open(`https://dev-yykxm3uopkevnok7.eu.auth0.com/u/reset-verify?ticket=${this.ticket}#`, "_blank");
  }
}
