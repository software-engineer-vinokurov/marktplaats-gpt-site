import { Component } from '@angular/core';
import { SuggestionsService } from '../suggestions.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { deepCopy } from '../../utils';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';


interface UserPreferences {
  suggestions_context?: string;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatProgressBarModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  public downloading: boolean = false;
  public uploading: boolean = false;

  constructor(private suggestionsService: SuggestionsService, private snackBar: MatSnackBar) { }

  user_preferences: UserPreferences = {}
  original_user_preferences: UserPreferences = {}

  ngOnInit() {
    this.loadUserPreferences();
  }

  isChanged(item: string) {
    const original = this.original_user_preferences[item as keyof UserPreferences]
    const current = this.user_preferences[item as keyof UserPreferences]
    const change = current !== original
    return change;
  }

  onCancelEdit(item: string) {
    this.user_preferences[item as keyof UserPreferences] = this.original_user_preferences[item as keyof UserPreferences]
  }

  onSave() {
    if (JSON.stringify(this.original_user_preferences) !== JSON.stringify(this.user_preferences)) {
      this.uploading = true;
      this.suggestionsService.saveUserPreferences(this.user_preferences).subscribe((response) => {
        this.uploading = false;
        if (response.body) {
          let data = response.body;
          console.log(data);
          this.storeUserPreferencesFromApi(data.user_preferences);
          this.snackBar.open('Settings saved', '', {
            duration: 3000
          });
          console.log(this.user_preferences);
        } else {
          console.error(response);
        }
      });
    } else {
      this.snackBar.open('Nothing to save', '', {
        duration: 3000
      });
    }
  }

  loadUserPreferences() {
    this.downloading = true;
    this.suggestionsService.getUserPreferences().subscribe((response) => {
      this.downloading = false;
      if (response.body) {
        let data = response.body;
        console.log(data);
        this.storeUserPreferencesFromApi(data.user_preferences);
      } else {
        console.error(response);
      }
    });
  }

  storeUserPreferencesFromApi(user_preferences: UserPreferences) {
    this.user_preferences = user_preferences;
    this.original_user_preferences = deepCopy(this.user_preferences);
    console.log(this.user_preferences);
  }

}