import { Component, OnInit } from '@angular/core';
import { routerTransition} from '../animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../user';
import * as moment from '../../../node_modules/moment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition],
    host: {'[@routerTransition]': ''}
})

export class LoginComponent implements OnInit{

    loginForm: FormGroup;
    users: Array<User>;
    user: User;

    constructor(private _userService: UserService, private _authService: AuthService, fb: FormBuilder, private router: Router) {

        this.loginForm = fb.group({
          'username' : [null, Validators.required],
          'password' : [null, Validators.required],
          });
    }

    ngOnInit() {
        this._userService.getUsers()
            .subscribe(res => {
                this.users = res;
            })
    }

    loginUser(user: User) {
        this._authService.loginUser(user)
            .subscribe(res => {
                if(res.status == 200) {
                this.setSession(res);
                this.router.navigateByUrl('home');
                }
                else {
                    window.alert('User Not Found');
                }
            })
    }

    private setSession(authResult) {
        console.log('set session called');
        var obj = JSON.parse(authResult.text());
        const expiresAt = moment().add(obj.expiresIn,'second');
        localStorage.setItem('id_token', obj.token);
    }

    logoutUser() {
         this._authService.logout();
    }
}