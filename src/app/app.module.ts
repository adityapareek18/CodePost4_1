import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostService } from './services/post.service';
import { NavComponent } from './components/nav/nav.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { LengthPipe } from './length.pipe';
import { PostComponent } from './components/post/post.component';
import { LoginComponent } from './components/login/login.component';
import { UserPostComponent } from './components/userPosts/userPosts.component';
import { SessionDatePipe } from '../app/pipes/date.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { LoggedInUsersGuard } from './guards/LoggedInUsersGuard';
import { AuthInterceptor } from './interceptors/http.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SessionTimePipe } from '../app/pipes/time.pipe';
import { ProfileComponent } from './components/profile/profile.component';
import { FillProfileComponent } from './components/fillProfile/fillProfile.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {CodepostService} from './services/codepost.service';


@NgModule({
  declarations: [
    RegisterComponent,
    AppComponent,
    NavComponent,
    HomeComponent,
    DetailsComponent,
    LengthPipe,
    SessionDatePipe,
    SessionTimePipe,
    PostComponent,
    LoginComponent,
    UserPostComponent,
    ProfileComponent,
    FillProfileComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    NgbModule.forRoot()
  ],
  providers: [PostService, UserService, AuthService, LoggedInUsersGuard, CodepostService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
