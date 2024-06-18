import {Injectable} from '@angular/core';
import jwtDecode from 'jwt-decode';
import {Router} from "@angular/router";

export interface JwtToken {
  roles: any[];
  exp: number,
  sub: string
}

const TOKEN_KEY = "token";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private router: Router) {
  }

  public setToken(token: string) {
    return new Promise<boolean>(resolve => {
      localStorage.setItem(TOKEN_KEY, token);
      resolve(true);
    });
  }

  public getDecodedToken(): JwtToken | undefined {
    return this.decodeToken(this.getToken());
  }

  public getToken() {
    return localStorage.getItem(TOKEN_KEY) ?? "";
  }

  public decodeToken(token: string) {
    try {
      return jwtDecode(token) as JwtToken;
    } catch (e: any) {
      return undefined;
    }
  }

  public isLoggedIn() {
    try {
      return !!this.getToken();
    } catch (e) {
      return false;
    }
  }

  public isAuthenticated() {
    const token = this.getDecodedToken();
    return token && !this.isTokenExpired(token);
  }

  public isTokenExpired(token: JwtToken) {
    if ((Math.floor((new Date).getTime() / 1000)) >= token.exp) {
      this.logout();
      return true;
    } else {
      return false;
    }
  }

  public checkIfUserHasRole(role: string) {
    return this.hasRole(this.getDecodedToken()?.roles ?? [], role);
  }

  private hasRole(roles: any[], role: string) {
    return roles.some(r => r.authority === role);
  }

  public logout() {
    localStorage.removeItem(TOKEN_KEY);
    this.router.navigate(['/blog']);
  }
}
