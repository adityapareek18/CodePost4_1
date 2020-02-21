import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {CanActivate} from '@angular/router';

@Injectable()
export class LoggedInUsersGuard implements CanActivate {
  constructor(private authService: AuthService) {
  };

  canActivate() {
    console.log('OnlyLoggedInUsers');
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      window.alert('You don\'t have permission to view this page');
      return false;
    }
  }
}
