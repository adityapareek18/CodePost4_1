import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { DetailsComponent } from './components/details/details.component';
import { PostComponent } from './components/post/post.component';
import { LoginComponent } from './components/login/login.component';
import { UserPostComponent } from './components/userPosts/userPosts.component';
import { LoggedInUsersGuard } from './guards/LoggedInUsersGuard';
import { ProfileComponent } from './components/profile/profile.component';
import { FillProfileComponent } from './components/fillProfile/fillProfile.component';

const routes: Routes = [
  {path: '', component: UserPostComponent },
  {path: 'home', component: HomeComponent },
  {path: 'login', component: LoginComponent },
  {path: 'details/:id', component: DetailsComponent, canActivate: [LoggedInUsersGuard] },
  {path: 'post', component: PostComponent, canActivate: [LoggedInUsersGuard] },
  {path: 'register', component: RegisterComponent },
  {path: 'profile', component: ProfileComponent},
  {path: 'fillprofile', component: FillProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
