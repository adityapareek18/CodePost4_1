import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {Profile} from '../../models/profile';
import {AuthService} from 'app/services/auth.service';
import {UserService} from 'app/services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CodepostService} from '../../services/codepost.service';
import {HttpResponse} from '@angular/common/http';
import {routerTransition} from '../../animations';

@Component({
  selector: 'fill-Profile',
  templateUrl: './fillProfile.component.html',
  styleUrls: ['./fillProfile.component.scss'],
  animations: routerTransition,
  host: {'[@routerTransition]': ''}
})

export class FillProfileComponent implements OnInit {

  user: User = new User();
  skillsKnown: Array<String>;
  profileForm: FormGroup;
  profile: Profile;
  skills = ['Spring', 'Hibernate', 'Elastic Search', 'Lucene', 'Solr'];
  knownSkills: Set<String> = new Set();
  wantSkills: Array<String> = [];
  filteredOptions: String[];

  constructor(private _authService: AuthService, private _userService: UserService, fb: FormBuilder, private codepostService: CodepostService) {
    this.profileForm = fb.group({
      'bio': [null, Validators.required],
      'about': [null, Validators.required],
      'knownSkill': [null],
      'wantSkill': [null],
    });
  }

  saveProfile() {
  }

  ngOnInit() {
    this._userService.getUserById(this.codepostService.loggedInUserId)
      .subscribe((response: HttpResponse<any>) => this.user = response.body);
  }

  filterSkills() {
    const value = this.profileForm.get('knownSkill').value;
    this.filteredOptions =
      value.length >= 1 ? this.filter(value) : [];
  }

  filter(val: String): String[] {
    return this.skills.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  addSkill() {
    const value = this.profileForm.get('knownSkill').value;
    this.knownSkills.add(value);
    this.profileForm.get('knownSkill').setValue('');
  }

  removeSkill(value) {
    this.knownSkills.delete(value);
  }
}
