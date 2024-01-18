import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@auth0/auth0-angular';
import { SuggestionsService, InviteResponse } from 'negotiate-ninja-lib';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  public downloading: boolean = false;
  public uploading: boolean = false;

  accountEmail: string = "";

  constructor(public auth: AuthService, private suggestionsService: SuggestionsService, private snackBar: MatSnackBar,) {
    auth.user$.subscribe(user => {
      //
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      this.snackBar.open(`Error occured: ${error.error}`, 'CLOSE');
    } else {
      // The backend returned an unsuccessful response code.
      console.error(`Backend returned code ${error.status}, body was: `, error.error);

      if (error.error.validation_error && error.error.validation_error.body_params) {
        const errors = Array.from(error.error.validation_error.body_params).map((p: any) => {
          return p["ctx"]["error"];
        });
        this.snackBar.open(`Error: ${errors.join("; ")}`, 'CLOSE');
      } else if (error.error.reason) {
        this.snackBar.open(`Error: ${error.error.reason}`, 'CLOSE');
      } else {
        this.snackBar.open(`Backend error code ${error.status}: ${JSON.stringify(error.error)}`, 'CLOSE');
      }
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  onDeleteAccount() {
    if (confirm(`This will result in deletion of your account, proceed?`)) {
      this.uploading = true;
      this.suggestionsService.deleteUser({
        email: this.accountEmail,
      }).pipe(
        catchError((e: HttpErrorResponse) => {
          this.uploading = false;
          return this.handleError(e);
        })
      ).subscribe((response: any) => {
        this.uploading = false;
        if (response.body) {
          let data = response.body;
          console.log(data);
          const snackBarRef = this.snackBar.open('User account deleted.', 'CLOSE', {
            duration: 10000
          });
          snackBarRef.afterDismissed().subscribe(() => {
            this.auth.logout();
          });
        } else {
          console.error(response);
          this.snackBar.open('Error deleting your account. Please contact support.', 'CLOSE');
        }
      });
    }
  }
}
