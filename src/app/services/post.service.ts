import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Post } from '../post';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class PostService {

  result:any;

  constructor(private _http: HttpClient) { }

  getPosts() {
    return this._http.get<Post[]>("/api/posts");
  }

  getPostsByUserId(userId) {
    return this._http.get<Post[]>("/api/posts/"+userId, {observe: 'body'});
  }

  getPost(id) {
    return this._http.get<Post>("/api/details/"+id, {observe: 'body'});
    }

  insertPost(post: Post) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this._http.post<Post>('/api/posts', JSON.stringify(post), { headers, observe: 'body' });
  }

  deletePost(id) {
    return this._http.delete("/api/posts/"+id, {observe: 'response'});
  }
}
