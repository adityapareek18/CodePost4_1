import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {Profile} from '../../models/profile';
import { AuthService } from 'app/services/auth.service';
import { UserService } from 'app/services/user.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {filter} from 'rxjs/operators/filter';

@Component({
    selector: 'fill-Profile',
    templateUrl: './fillProfile.component.html',
    styleUrls: ['./fillProfile.component.scss']
})

export class FillProfileComponent implements OnInit {

    user: User = new User();
    skillsKnown: Array<String>;
    profileForm: FormGroup;
    profile: Profile;
    skills = ['Spring', 'Hibernate', 'Elastic Search', 'Lucene', 'Solr'];
    knownSkills: Array<String> = [];
    wantSkills: Array<String> = [];
    filteredOptions: String[];

    constructor(private _authService: AuthService, private _userService: UserService, fb: FormBuilder) {
        this.profileForm = fb.group({
            'bio' : [null, Validators.required],
            'about' : [null, Validators.required],
            'knownSkill' : [null],
            'wantSkill' : [null],
        });
    }
    saveProfile() {

    }

    ngOnInit() {
        this._userService.getUserById(this._authService.getLoggedInUserId())
        .subscribe(res => this.user = res);
    }

    filterSkills() {
        var value = this.profileForm.get('knownSkill').value;
        this.filteredOptions =
        value.length >= 1 ? this.filter(value): [];
    }

    filter(val: String): String[] {
        return this.skills.filter(option =>
          option.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }

    addSkill() {
        var value = this.profileForm.get('knownSkill').value; 
        this.knownSkills.push(value);
        this.profileForm.get('knownSkill').setValue("");
    }
}