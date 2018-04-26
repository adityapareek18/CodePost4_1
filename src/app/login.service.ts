import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  result:any;

  constructor(private _http: Http) { }

  getUserWithUsernameAndPassword(username: String, password: String) {
    return this._http.get("/api/users")
      .map(result => this.result = result.json());
  }

  getPost(id) {
    return this._http.get("/api/details/"+id)
      .map(result => this.result = result.json());
  }
}
