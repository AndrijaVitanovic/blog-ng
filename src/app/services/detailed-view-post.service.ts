import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DetailedViewPostService {
  constructor(private http: HttpClient) {}

  getPostById(id: any) {
    return this.http.get(`${environment.baseApi}/api/v1/posts/${id}`);
  }

  createComment(data: any) {
    return this.http.post(`${environment.baseApi}/api/v1/comments`, data);
  }
}
