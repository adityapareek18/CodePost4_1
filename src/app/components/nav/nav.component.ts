import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  userLoggedIn: Boolean = false;
  constructor(private _userService: UserService, private _authService: AuthService, private router: Router) { }

  ngOnInit() {
	this.userLoggedIn = this.isLoggedIn();
  }
  
  isLoggedIn(){
	let loggedInUserId = localStorage.getItem('id_token');
  	if(loggedInUserId)
  		return true;
  	else
		return false;
  }

  logout(){
    this._authService.logout();
    this.router.navigateByUrl('/');
  }
}
