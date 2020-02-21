import {Component, OnInit} from '@angular/core';
import {PostService} from '../../services/post.service';
import {AuthService} from '../../services/auth.service';
import {Post} from '../../post';
import {routerTransition} from '../../animations';
import * as moment from 'moment';
import {CodepostService} from '../../services/codepost.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: routerTransition,
  host: {'[@routerTransition]': ''}
})
export class HomeComponent implements OnInit {

  posts: Array<Post> = [];

  constructor(private _postService: PostService, private _authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    const loggedInUserId = this._authService.getLoggedInUserId();
    this._postService.getPostsByUserId(loggedInUserId)
      .subscribe(res => this.posts = res);
  }

  deletePost(post) {
    this._postService.deletePost(post._id)
      .subscribe(res => {
        if (JSON.parse(JSON.stringify(res)).status === 200) {
          const index = this.posts.indexOf(post, 0);
          if (index > -1) {
            this.posts.splice(index, 1);
          }
        } else {
          console.log('Post deletion failed.');
        }
      })
  }

  navigateToPost() {
    this.router.navigateByUrl('/post');
  }

}
