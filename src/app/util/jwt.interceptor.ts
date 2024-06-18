import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Injectable} from "@angular/core";
import {Observable, tap} from "rxjs";
import {SnackbarHandler} from "./snackbar-handler";
import {environment} from "../../environments/environment";
import {AuthService} from "../services/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private readonly headerPrefix = "Bearer ";

  constructor(private authService: AuthService, private snackBar: SnackbarHandler) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.authService.getToken();
    if (token) {
      const authHeader = this.headerPrefix + token;
      request = request.clone({
        setHeaders: {
          Authorization: authHeader
        }
      });
    }
    return next.handle(request).pipe(
      tap({
        next: success => {
          if (request.url !== "http://localhost:8080/api/v1/posts/upvote" && request.url !== "http://localhost:8080/api/v1/posts/downvote") {
            const status = (success as any).status;
            if (status && status.toString().startsWith("20") && !request.reportProgress) {
              switch (request.method) {
                case "POST":
                  this.snackBar.showSuccessSnackbar("Successfully added!");
                  break;
                case "PUT":
                case "PATCH":
                  this.snackBar.showSuccessSnackbar("Successfully updated!");
                  break;
                case "DELETE":
                  this.snackBar.showSuccessSnackbar("Successfully deleted!");
                  break;
              }
            }
          }
        },
        error: async err => {
          if (err.status === 401) {
            if (environment.production) {
              this.authService.logout();
            } else {
              return;
            }
          } else if (err.status === 403) {
            if (environment.production) {
              this.authService.routeBasedOnRoles();
            }
          }
          if (err.status === 0) {
            this.snackBar.showErrorSnackbar(`Server is not currently available, try again later!`);
          } else if (err.status === 400 && err.error.password) {
            this.snackBar.showErrorSnackbar(`${err.status}: ${err.error.password}`);
          } else if (err.status === 400 && err.error.email) {
            this.snackBar.showErrorSnackbar(`${err.status}: ${err.error.email}`);
          } else {
            this.snackBar.showErrorSnackbar(`${err.error.status}: ${err.error.message}`);
          }
        }
      })
    );
  }
}
