import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { User } from '../user';
import * as moment from '../../../node_modules/moment';

@Injectable()
export class AuthService {

    constructor(private _http: Http){}
    result: any;

    loginUser(user: User) {
        return this._http.get("/api/authenticate",JSON.stringify(user))
            .map(res => {
                if(res.status == 200)
                this.setSession(res);
            });
    }

    private setSession(authResult) {
        console.log('set session called');
        const expiresAt = moment().add(authResult.expiresIn,'second');
        localStorage.setItem('id_token', authResult.token);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
        console.log(authResult.token);
        console.log(JSON.stringify(expiresAt.valueOf()));
    }

    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }    
}