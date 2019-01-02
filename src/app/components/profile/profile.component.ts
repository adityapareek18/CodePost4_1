import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routerTransition } from '../../animations';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [routerTransition],
  host: {'[@routerTransition]': ''}
})
export class ProfileComponent implements OnInit {

  postForm: FormGroup;
  stuffs: Array<string> = [];

  constructor(private _postService: PostService, private _authService: AuthService, fb: FormBuilder, private router: Router) { 

    this.postForm = fb.group({
      'title' : [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(75)])],
	    'startDate' : [null, Validators.required],
      'startTime' : [null, Validators.required],
	    'endTime' : [null, Validators.required],
      'description' : [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])]
    });

  }

  ngOnInit() {
    this.stuffs.push("Hibernate");
    this.stuffs.push("Spring");
    this.stuffs.push("HTML5");
    this.stuffs.push("CSS3");
    this.stuffs.push("Elastic Search");
    this.stuffs.push("Hadoop");
    this.stuffs.push("Lucene");
    this.stuffs.push("Hibernate");
    this.stuffs.push("Spring");
    this.stuffs.push("HTML5");
    this.stuffs.push("CSS3");
    this.stuffs.push("Elastic Search");
    this.stuffs.push("Hadoop");
    this.stuffs.push("Lucene");
  }
}
