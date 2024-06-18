import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {JwtService} from "./jwt.service";

@Injectable({
  providedIn: "root"
})
export class UserAuthGuardService implements CanActivate {

  constructor(private router: Router, private jwtService: JwtService) {
  }

  canActivate() {
    if (!environment.production) {
      return true;
    }
    if (!this.jwtService.checkIfUserHasRole("ROLE_USER")) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
