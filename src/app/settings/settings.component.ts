import { Component } from '@angular/core';
import { SuggestionsService } from '../suggestions.service';
import { MatCardModule } from '@angular/material/card';

interface UserPreferences {
  suggestions_context?: string;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  constructor(private suggestionsService: SuggestionsService) { }

  user_preferences: UserPreferences = {}

  ngOnInit() {
    this.suggestionsService.getUserPreferences().subscribe((response) => {
      if (response.body) {
        let data = response.body;
        console.log(data);
        this.user_preferences = data.user_preferences as UserPreferences;
        console.log(this.user_preferences);
      } else {
        console.error(response);
      }
    });
  }

}
