import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { AuthService } from '../services/auth.service';
import { Post } from '../post';
import { routerTransition } from '../animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:  routerTransition ,
  host: { '[@routerTransition]': ''}
})
export class HomeComponent implements OnInit {

  posts: Array<Post> = [];

  constructor(private _postService: PostService, private _authService: AuthService) { }

  ngOnInit() {
    var loggedInUserId = this._authService.getLoggedInUserId();
    this._postService.getPostsByUserId(loggedInUserId)
      .subscribe(res => this.posts = res);
  }

  deletePost(post) {
    this._postService.deletePost(post._id)
      .subscribe(res => {
        if (JSON.parse(JSON.stringify(res)).status == 200) {
          var index = this.posts.indexOf(post, 0);
          if (index > -1)
            this.posts.splice(index, 1);
        }
        else
          console.log('Post deletion failed.');
      })
  }

}
