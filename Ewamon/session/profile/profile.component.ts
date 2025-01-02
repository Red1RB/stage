import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user-service/user.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../../models/user/user";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {
  private _editForm: FormGroup;
  private _notEditMode: boolean = true;
  private _isCheckBoxVisible: boolean = false;
  private _buttonText: string = "Edit";
  private _ewamonEditButton: string = "Edit";
  private _url: any;
  private _defaultProfileUrl: string = 'assets/images/defaultProfilePicture.png';
  private _user: User;

  constructor(private _userService: UserService, private _route: Router,
              private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getProfile();
    this.userEwamon();
  }

  getProfile() {
    this.userService.profile();
  }

  updateUser(user) {
    this.userService.updateUser(user);
  }

  userEwamon() {
    this.userService.userEwamon();
  }

  onToggleEwamonEdit() {
    this.isCheckBoxVisible = !this.isCheckBoxVisible;
    if (this.ewamonEditButton == "Edit") {
      this.ewamonEditButton = "Save";
    } else {
      this.ewamonEditButton = "Edit";
    }
  }

  onToggleEditMode() {
    this.notEditMode = !this.notEditMode;
    if (this.buttonText == "Edit") {
      this.buttonText = "Save";
    } else {
      this.user = new User(this.userService.user.id, this.userService.user.home,
        this.userService.user.email, this.userService.user.username, this.userService.user.password,
        this.userService.user.birthday, this.userService.user.gender,
        this.userService.user.secretQuestion, this.userService.user.activeEwamon,
        this.userService.user.money, this.userService.user.gameID);
      this.updateUser(this.user);
      this.buttonText = "Edit";
      console.log(this.userService.user.activeEwamon)
    }
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get url(): any {
    return this._url;
  }

  set url(value: any) {
    this._url = value;
  }

  get defaultProfileUrl(): string {
    return this._defaultProfileUrl;
  }

  set defaultProfileUrl(value: string) {
    this._defaultProfileUrl = value;
  }

  get formBuilder(): FormBuilder {
    return this._formBuilder;
  }

  set formBuilder(value: FormBuilder) {
    this._formBuilder = value;
  }

  get editForm(): FormGroup {
    return this._editForm;
  }

  set editForm(value: FormGroup) {
    this._editForm = value;
  }

  get route(): Router {
    return this._route;
  }

  set route(value: Router) {
    this._route = value;
  }

  get notEditMode(): boolean {
    return this._notEditMode;
  }

  set notEditMode(value: boolean) {
    this._notEditMode = value;
  }

  get isCheckBoxVisible(): boolean {
    return this._isCheckBoxVisible;
  }

  set isCheckBoxVisible(value: boolean) {
    this._isCheckBoxVisible = value;
  }

  get buttonText(): string {
    return this._buttonText;
  }

  set buttonText(value: string) {
    this._buttonText = value;
  }

  get ewamonEditButton(): string {
    return this._ewamonEditButton;
  }

  set ewamonEditButton(value: string) {
    this._ewamonEditButton = value;
  }

  get userService(): UserService {
    return this._userService;
  }
}
