import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public getUserByEmail(email: string): Observable<User> {
    let queryParams = new HttpParams().append('email', email);
    return this.http.get<User>(`${environment.baseApi}/api/v1/users/email`, {
      params: queryParams,
    });
  }

  public getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${environment.baseApi}/api/v1/users/${id}`);
  }
}
