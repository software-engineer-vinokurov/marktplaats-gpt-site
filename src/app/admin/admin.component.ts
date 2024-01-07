import { Component } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { environment } from '../../environments/environment';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { SuggestionsService, InviteResponse } from 'negotiate-ninja-lib';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  public downloading: boolean = false;
  public uploading: boolean = false;

  inviteEmail: string = "";
  inviteInternalComment: string = "";
  inviteResponse?: InviteResponse;
  inviteResponseJSON?: string;
  inviteError?: any;
  inviteErrorJSON?: string;

  constructor(public auth: AuthService, private suggestionsService: SuggestionsService, private snackBar: MatSnackBar,) {
    auth.user$.subscribe(user => {
      const isAdmin = user?.sub === environment.auth0_admin_user_id;
      if (!isAdmin) {
        window.document.location = "/";
      }
    });
  }

  onInvite() {
    if (confirm(`Inviting ${this.inviteEmail} with internal comment: "${this.inviteInternalComment}?`)) {
      this.uploading = true;
      this.suggestionsService.inviteNewUser({
        email: this.inviteEmail,
        internal_comment: this.inviteInternalComment,
      }).subscribe((response: any) => {
        this.uploading = false;
        if (response.body) {
          let data = response.body;
          console.log(data);
          this.inviteResponse = data as InviteResponse;
          this.inviteResponseJSON = JSON.stringify(this.inviteResponse);
          this.snackBar.open('User created, invite link displayed', 'CLOSE', {
            duration: 10000
          });
        } else {
          console.error(response);
          this.inviteError = response;
          this.inviteErrorJSON = JSON.stringify(this.inviteError);
          this.snackBar.open('Error creating user and an invite link.', 'CLOSE');
        }
      });
    }
  }

}
