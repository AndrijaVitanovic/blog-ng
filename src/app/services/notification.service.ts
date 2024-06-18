import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  public markSeen(id: number) {
    return firstValueFrom(this.http.put(`${environment.baseApi}/api/v1/notifications/${encodeURIComponent(String(id))}`, null));
  }
}
