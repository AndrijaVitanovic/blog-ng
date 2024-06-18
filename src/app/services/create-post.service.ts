import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CreatePostService {
  constructor(private http: HttpClient) {}

  createPost(data: any) {
    return this.http.post(`${environment.baseApi}/api/v1/posts`, data);
  }
}
