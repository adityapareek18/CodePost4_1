import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { User } from '../user';

@Injectable()
export class UserService {

    constructor(private _http: Http){}
    result: any;

    getUsers() {
        return this._http.get("/api/users")
          .map(result => this.result = result.json());
      }
    
    createUser(user: User){
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        return this._http.post('/api/users', JSON.stringify(user), options)
            .map(user => this.result = user.json());
    }

    loginUser(user: User) {
        return this._http.get("/authenticate"+user);
    }
}