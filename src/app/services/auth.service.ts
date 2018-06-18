import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { User } from '../user';
import * as moment from '../../../node_modules/moment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

    constructor(private _http: HttpClient) { }
    result: any;

    loginUser(user: User) {
        return this._http.post("/api/authenticate", { username: user.username, password: user.password },
            { observe: 'response' });
    }

    logout() {
        localStorage.removeItem("id_token");
    }

    public isLoggedIn() {
        //console.log("loggedin"+" "+moment().isBefore(this.getExpiration()));
        //return moment().isBefore(this.getExpiration());
        return (localStorage.getItem("id_token") != 'undefined' && localStorage.getItem("id_token") != null);
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }

    getLoggedInUserId() {
        var token = localStorage.getItem("id_token");
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        var tokenObj = JSON.parse(window.atob(base64));
        return tokenObj._id;
    }
}