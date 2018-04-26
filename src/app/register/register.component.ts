import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Post } from '../post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routerTransition } from '../animations';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [routerTransition],
  host: {'[@routerTransition]': ''}
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  users: Array<User> = new Array<User>();

  constructor(private _userService: UserService, fb: FormBuilder, private router: Router) { 

    this.registerForm = fb.group({
      'firstName' : [null, Validators.required],
      'lastName' : [null, Validators.required],
      'username' : [null, Validators.required],
      'password' : [null, Validators.required],
      });
  }

  registerUser(user: User) {
    this._userService.createUser(user)
      .subscribe(res => {
        this.users.push(res);
        console.log("User Created Successfully")
        this.router.navigateByUrl('login');
      });
  }

  ngOnInit() {
    this._userService.getUsers()
    .subscribe(users => {
        this.users = users
    })
  }

  usernameTaken(username: string): Boolean {
    var exists =  this.users.filter( user => (user.username === username)).length>0;
    return exists;
  }
}
