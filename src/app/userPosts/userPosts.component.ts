import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Post } from '../post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routerTransition } from '../animations';
import { User } from '../user';

@Component({
  selector: 'user-post',
  templateUrl: './userPosts.component.html',
  styleUrls: ['./userPosts.component.scss'],
  animations: [routerTransition],
  host: {'[@routerTransition]': ''}
})
export class UserPostComponent {

  registerForm: FormGroup;

  constructor(private _userService: UserService, fb: FormBuilder, private router: Router) { 

    this.registerForm = fb.group({
      'username' : [null, Validators.required],
      'password' : [null, Validators.required]
      });
  }
}
