import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../post';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../animations';
import { Time } from '@angular/common';
import { SessionDatePipe } from '../../pipes/date.pipe';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],  
  animations: [routerTransition],
  host: {'[@routerTransition]': ''}
})
export class DetailsComponent implements OnInit {

  post: Post;
  date: Date;
  startTime: Time;
  endTime: Time;

  constructor(private _postService: PostService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe((params) => {

      const id = params['id'];

      this._postService.getPost(id)
        .subscribe(res => {
          this.post = res;
          const date1: any = this.post.startDate;
          this.date = new Date(date1.year, date1.month, date1.day);
        });
    })
  }
}
