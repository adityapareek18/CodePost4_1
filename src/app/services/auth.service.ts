import {EventEmitter, Injectable, Output} from '@angular/core';
import {User} from '../user';
import * as moment from '../../../node_modules/moment';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/observable/of';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthService {

  @Output() loginEvent: EventEmitter<any> = new EventEmitter();
  @Output() logoutEvent: EventEmitter<any> = new EventEmitter();

  constructor(private _http: HttpClient) {
  }

  loginUser(user: User) {
    const loginUserUri = environment.apiRoot + environment.authenticate;
    return this._http.post(loginUserUri, {username: user.username, password: user.password});
  }

  logout() {
    localStorage.removeItem('id_token');
  }

  isLoggedIn() {
    return !!localStorage.getItem('id_token');
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  getLoggedInUserId() {
    const token = localStorage.getItem('id_token');
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const tokenObj = JSON.parse(window.atob(base64));
    return tokenObj._id;
  }
}
