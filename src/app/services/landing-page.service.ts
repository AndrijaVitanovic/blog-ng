import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {

  constructor(private http: HttpClient) { }


  public getAllPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.baseApi}/api/v1/posts`);
  }

  public upvote(post: any): Observable<any> {
    return this.http.put<any>(`${environment.baseApi}/api/v1/posts/upvote`, post);
  }

  public downvote(post: any): Observable<any> {
    return this.http.put<any>(`${environment.baseApi}/api/v1/posts/downvote`, post);
  }

  public getAllPostsByCategoryId(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.baseApi}/api/v1/posts/category/${categoryId}`);
  }
}
