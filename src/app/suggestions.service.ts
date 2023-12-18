import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

export interface SetUserPreferencesRequest {
  suggestions_context?: string;
}

export interface UserPreferencesResponse {
  user_preferences: {
    suggestions_context?: string;
  }
}

export interface UserBalanceResponse {
  updated_at?: string;
  user_balance: {
    balance?: number;
    currency?: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {
  private apiServer = "http://127.0.0.1:5000";
  //private apiServer = "https://marktplaatsgpt.fly.dev";

  constructor(private http: HttpClient, private tokenService: TokenService,) {
  }

  getUserBalance() {
    return this.http.get<UserBalanceResponse>(`${this.apiServer}/user/balance`, {
      observe: 'response',
      headers: {
        Authorization: 'Bearer ' + this.tokenService.token,
      }
    });
  }

  getUserPreferences() {
    return this.http.get<UserPreferencesResponse>(`${this.apiServer}/user/preferences`, {
      observe: 'response',
      headers: {
        Authorization: 'Bearer ' + this.tokenService.token,
      }
    });
  }

  saveUserPreferences(user_preferences: {
    suggestions_context?: string;
  }) {
    const payload: SetUserPreferencesRequest = user_preferences;
    return this.http.post<UserPreferencesResponse>(`${this.apiServer}/user/preferences`, payload, {
      observe: 'response',
      headers: {
        Authorization: 'Bearer ' + this.tokenService.token,
      }
    });
  }
}
