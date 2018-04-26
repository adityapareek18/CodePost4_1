import { Component, OnInit } from '@angular/core';
import { routerTransition} from '../animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../user';

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

    constructor(private _userService: UserService, fb: FormBuilder, private router: Router) {

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
        this._userService.loginUser(user)
            .subscribe(res => {
               if(res.status == 401) {
                   console.log("User Not Found");
               }
               else if(res.status == 200) {
                   localStorage.setItem("LoggedinUser", user._id);
                console.log("Login Successfull");
                this.router.navigateByUrl('home');
               }
            })
    }

    logoutUser() {
        
    }

}