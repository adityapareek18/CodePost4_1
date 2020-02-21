import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../animations';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../user';
import * as moment from '../../../../node_modules/moment';
import {CodepostService} from '../../services/codepost.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition],
  host: {'[@routerTransition]': ''}
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  users: Array<User>;
  user: User;

  static setSession(authResult) {
    console.log('set session called');
    const expiresAt = moment().add(authResult.expiresIn, 'second');
    localStorage.setItem('id_token', authResult.token);
  }

  constructor(private _userService: UserService, private _authService: AuthService, fb: FormBuilder, private router: Router,
              private codepostService: CodepostService) {

    this.loginForm = fb.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required],
    });
  }

  ngOnInit() {
    localStorage.clear();
    /*this._userService.getUsers()
      .subscribe(res => {
        this.users = res;
      });*/
  }

  loginUser(user: User) {
    this._authService.loginUser(user)
      .subscribe((res: any) => {
        if (res.status === 200) {
          console.log(res);
          this.codepostService.userLoggedIn = true;
          this.codepostService.loggedInUserId = res.id;
          LoginComponent.setSession(res);
          this.router.navigateByUrl('home');
          this._authService.loginEvent.emit();
        } else {
          window.alert('User Not Found');
        }
      })
  }
}
