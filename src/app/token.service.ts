import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

export interface TokenServiceOptions {
  /**
   * Will request for new id-token if it is less than {tokenExpDeltaSeconds} seconds to expiration
   */
  tokenExpDeltaSeconds: number;
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public token?: string;

  private options: TokenServiceOptions = {
    tokenExpDeltaSeconds: 600,
  }

  constructor(private auth: AuthService) {
    this._getToken()
  }

  private _getToken() {
    this.auth.idTokenClaims$.subscribe(v => {
      if (v && v.exp && (v.exp - this.options.tokenExpDeltaSeconds) > (new Date()).getTime() / 1000) {
        this.token = v.__raw;
        const renewAfter = (v.exp - this.options.tokenExpDeltaSeconds) * 1000 - 1000 - (new Date()).getTime();
        setTimeout(() => {
          this._getToken()
        }, renewAfter);
      } else {
        this.auth.getAccessTokenSilently().subscribe(v => {
          this._getToken()
        });
      }
    });
  }
}
