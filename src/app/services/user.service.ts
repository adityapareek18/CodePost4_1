import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {User} from '../user';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class UserService {

  result: any;

  constructor(private httpClient: HttpClient) {
  }

  getUsers(): Observable<HttpResponse<User[]>>  {
    return this.httpClient.get('/api/users')
      .map((result: HttpResponse<any>) => result.body);
  }

  createUser(user: User) {
    const registerUser = environment.apiRoot + environment.users;
    return this.httpClient.post(registerUser, user, {observe: 'response'})
      .map((response: HttpResponse<any>) => response.body)
      .catch((err: HttpErrorResponse) => {
        return Observable.throwError(err);
      });
  }

  getUserById(id: String) {
    return this.httpClient.get('/api/users/' + id)
      .map(result => this.result = result);
  }
}
