import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {CodepostService} from '../../services/codepost.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  providers: [CodepostService]
})
export class NavComponent implements OnInit {

  userLoggedIn = this._authService.isLoggedIn();

  constructor(private _userService: UserService, private _authService: AuthService, private router: Router) {
    _authService.loginEvent.subscribe(res => this.userLoggedIn = true);
    _authService.logoutEvent.subscribe(res => this.userLoggedIn = false);
  }

  ngOnInit() {
  }

  logout() {
    this._authService.logout();
    this.router.navigateByUrl('/');
    this._authService.logoutEvent.emit();
  }

  login() {
    this.router.navigateByUrl('login');
  }
}
