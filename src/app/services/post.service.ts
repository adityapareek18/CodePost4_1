import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Post} from '../post';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class PostService {

  result: any;

  constructor(private _http: HttpClient) {
  }

  getPosts() {
    return this._http.get<Post[]>('/api/posts');
  }

  getPostsByUserId(userId) {
    const posts = environment.apiRoot + environment.posts;
    return this._http.get<Post[]>(posts + '/' + userId, {observe: 'body'});
  }

  getPost(id) {
    const postDetails = environment.apiRoot + environment.details;
    return this._http.get<Post>(postDetails + '/' + id, {observe: 'body'});
  }

  insertPost(post: Post) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const posts = environment.apiRoot + environment.posts;
    return this._http.post<Post>(posts, JSON.stringify(post), {headers, observe: 'body'});
  }

  deletePost(id) {
    const posts = environment.apiRoot + environment.posts;
    return this._http.delete(posts + '/' + id, {observe: 'response'});
  }
}
