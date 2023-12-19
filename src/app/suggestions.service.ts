import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../config';

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

export interface UsageHistoryResponse {
  updated_at?: string;
  user_usage_history: {
    entries: {
      id: string;
      updated_at: string;
      service: string
      usage_cost: number;
      balance_before: number;
    }[]
  }
}

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {

  constructor(private http: HttpClient,) {
  }

  getUserBalance() {
    return this.http.get<UserBalanceResponse>(`${config.apiServer}/user/balance`, {
      observe: 'response'
    });
  }

  getUserUsageHistory() {
    return this.http.get<UsageHistoryResponse>(`${config.apiServer}/user/usage-history`, {
      observe: 'response'
    });
  }

  getUserPreferences() {
    return this.http.get<UserPreferencesResponse>(`${config.apiServer}/user/preferences`, {
      observe: 'response'
    });
  }

  saveUserPreferences(user_preferences: {
    suggestions_context?: string;
  }) {
    const payload: SetUserPreferencesRequest = user_preferences;
    return this.http.post<UserPreferencesResponse>(`${config.apiServer}/user/preferences`, payload, {
      observe: 'response'
    });
  }
}
