import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {JwtService} from "./jwt.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private router: Router, private jwtService: JwtService) {
  }

  canActivate() {
    if (!environment.production) {
      return true;
    }
    if (!this.jwtService.checkIfUserHasRole("ROLE_ADMIN")) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
