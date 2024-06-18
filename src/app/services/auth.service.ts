import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {RegisterDto} from "../model/register-dto";
import {JwtService} from "./jwt.service";
import {Router} from "@angular/router";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,
              private jwtService: JwtService,
              private router: Router) {
  }

  login(credentials: { username: string, password: string }) {
    localStorage.removeItem("token");
    return firstValueFrom(this.http.post(`${environment.baseApi}/login`, credentials, {
      responseType: 'text',
      reportProgress: true
    })).then(data => {
      if (data) {
        this.jwtService.setToken(data).then(res => {
          if (res) {
            this.routeBasedOnRoles();
          }
        });
      }
      return new Promise(resolve => resolve(data));
    })
  }

  public routeBasedOnRoles() {
    if (this.jwtService.checkIfUserHasRole("ROLE_ADMIN")) {
      this.router.navigate(['admin'])
    } else {
      this.router.navigate(['']);
    }
  }

  public getToken() {
    return this.jwtService.getToken();
  }

  public logout() {
    this.jwtService.logout();
    this.router.navigate(['login']);
  }

 register(registerDto: RegisterDto) {
    return this.http.post(`${environment.baseApi}/api/v1/users/register`, registerDto);
 }
}
