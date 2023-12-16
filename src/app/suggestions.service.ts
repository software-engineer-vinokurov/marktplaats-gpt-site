import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';


export interface UserPreferencesResponse {
  user_preferences: {
    suggestions_context?: string;
  }
}


@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {
  constructor(private http: HttpClient, private auth: AuthService,) {
    auth.idTokenClaims$.subscribe(v => {
      v && this.setToken(v.__raw);
    });
  }

  apiServer = "http://127.0.0.1:5000";
  // apiServer = "https://marktplaatsgpt.fly.dev";

  token?: string;

  setToken(token: string) {
    this.token = token;
  }

  getUserPreferences() {
    return this.http.get<UserPreferencesResponse>(`${this.apiServer}/user-preferences`, {
      observe: 'response',
      headers: {
        Authorization: 'Bearer ' + this.token,
      }
    });
  }
}
