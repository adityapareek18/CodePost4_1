import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { DetailsComponent } from './details/details.component';
import { PostComponent } from './post/post.component';
import { LoginComponent } from './login/login.component';
import { UserPostComponent } from './userPosts/userPosts.component';
import { LoggedInUsersGuard } from './guards/LoggedInUsersGuard';

const routes: Routes = [
  {path: '', component: UserPostComponent },
  {path: 'home', component: HomeComponent },
  {path: 'login', component: LoginComponent },
  {path: 'details/:id', component: DetailsComponent, canActivate: [LoggedInUsersGuard] },
  {path: 'post', component: PostComponent, canActivate: [LoggedInUsersGuard] },
  {path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
