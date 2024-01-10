import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SubscribeFormComponent, SuggestionsService, TosDialog } from 'negotiate-ninja-lib';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

interface UserPreferences {
  suggestions_context?: string;
  terms_accepted_at?: string;
}

type CTAType = "subscribe";

@Component({
  selector: 'app-get-started',
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule,
    MatTabsModule,
    FormsModule,
    MatInputModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatButtonModule,
    SubscribeFormComponent,
  ],
  templateUrl: './get-started.component.html',
  styleUrl: './get-started.component.css'
})
export class GetStartedComponent {
  public downloading: boolean = false;
  public uploading: boolean = false;

  cta: CTAType = "subscribe";

  user_preferences: UserPreferences = {}

  selectedTab = new FormControl(0);

  constructor(private suggestionsService: SuggestionsService, private snackBar: MatSnackBar, private _formBuilder: FormBuilder, public dialog: MatDialog) { }

  formGroup = this._formBuilder.group({
    acceptTerms: [false, Validators.requiredTrue],
  });

  ngOnInit() {
    const isChrome = /Chrome\//i.test(window.navigator.userAgent);
    this.selectedTab.setValue(isChrome ? 0 : 1);

    this.loadUserPreferences();
  }

  openTermsDialog() {
    const dialogRef = this.dialog.open(TosDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  submitTermsForm(formGroup: FormGroup) {
    // alert(JSON.stringify(formGroup.value, null, 2));
    if (formGroup.value.acceptTerms) {
      this.user_preferences.terms_accepted_at = new Date().toISOString();
      this.onSave();
    }
  }

  onSave() {
    this.uploading = true;
    this.suggestionsService.saveUserPreferences(this.user_preferences).subscribe((response) => {
      this.uploading = false;
      if (response.body) {
        let data = response.body;
        // console.log(data);
        this.storeUserPreferencesFromApi(data.user_preferences);
        this.snackBar.open('Saved', '', {
          duration: 3000
        });
        // console.log(this.user_preferences);
      } else {
        console.error(response);
      }
    });
  }

  loadUserPreferences() {
    this.downloading = true;
    this.suggestionsService.getUserPreferences().subscribe((response) => {
      this.downloading = false;
      if (response.body) {
        let data = response.body;
        // console.log(data);
        this.storeUserPreferencesFromApi(data.user_preferences);
      } else {
        console.error(response);
      }
    });
  }

  storeUserPreferencesFromApi(user_preferences: UserPreferences) {
    this.user_preferences = user_preferences;
  }

}
