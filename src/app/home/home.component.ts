import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
import { routerTransition } from '../animations';
import { trigger,
  state,
  style,
  transition,
  animate,
  keyframes, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],  
  animations: [routerTransition,
    trigger('posts', [
      transition('* => *', [
  
        query(':enter', style({ opacity: 0 }), {optional: true}),
  
        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true})
          ,
        query(':leave', stagger('300ms', [
          animate('.6s ease-out', keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 0, transform: 'translateY(-75%)',     offset: 1.0}),
          ]))]), {optional: true})
      ])
    ])
  ],
  host: {'[@routerTransition]': '', '[@posts]': '',}
})
export class HomeComponent implements OnInit {

  posts: Array<Post>;

  constructor(private _postService: PostService) { }

  ngOnInit() {
    this._postService.getPosts()
      .subscribe(res=> this.posts = res);
  }

  deletePost(post) {
    // this._postService.deletePost(post._id)
    //   .subscribe(res => {
    //     if(res.status == 200) {
          var index = this.posts.indexOf(post, 0);
          if (index > -1)
          this.posts.splice(index, 1);
  //       }
  //       else
  //       console.log('Post deletion failed.');
  //     })
    }

}
