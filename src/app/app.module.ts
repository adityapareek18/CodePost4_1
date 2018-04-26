import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostService } from './post.service';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { LengthPipe } from './length.pipe';
import { PostComponent } from './post/post.component';
import { LoginComponent } from './login/login.component';
import { UserPostComponent } from './userPosts/userPosts.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from './services/user.service';
import { AuthenticationService } from './services/auth.service';

@NgModule({
  declarations: [
    RegisterComponent,
    AppComponent,
    NavComponent,
    HomeComponent,
    DetailsComponent,
    LengthPipe,
    PostComponent,
    LoginComponent,
    UserPostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [PostService, UserService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
