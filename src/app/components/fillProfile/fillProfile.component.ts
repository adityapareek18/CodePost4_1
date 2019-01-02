import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {Profile} from '../../models/profile';
import { AuthService } from 'app/services/auth.service';
import { UserService } from 'app/services/user.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'fill-Profile',
    templateUrl: './fillProfile.component.html',
    styleUrls: ['./fillProfile.component.scss']
})

export class FillProfileComponent implements OnInit {

    user: User;
    skillsKnown: Array<String>;
    profileForm: FormGroup;
    profile: Profile;
    skills: Array<String> = [];

    constructor(private _authService: AuthService, private _userService: UserService, fb: FormBuilder) {
        this.profileForm = fb.group({
            'bio' : [null, Validators.required],
            'about' : [null, Validators.required],
            'skillKnown' : [null, Validators.required],
            'skillWant' : [null, Validators.required],
        });
    }
    saveProfile() {

    }

    ngOnInit() {
        this._userService.getUserById(this._authService.getLoggedInUserId())
        .subscribe(res => this.user = res);
        this.populateSkills();
    }

    populateSkills() {
        this.skills[0] = "Elastic Search";
        this.skills[1] = "Java 8";
        this.skills[2] = "Hibernate";
        this.skills[3] = "Multithreading in Java";
        this.skills[4] = "Something";
        this.skills[5] = "Elastic";

    }
}