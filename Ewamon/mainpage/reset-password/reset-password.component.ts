import {Component, OnInit} from '@angular/core';
import {ResetPasswordService} from "../../../services/reset-password-service/reset-password-service";
import {User} from "../../../models/user/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomvalidationService} from "../../../services/customvalidation-service/customvalidation.service";
import {HttpClient} from "@angular/common/http";
import {ForgotPasswordService} from "../../../services/forgot-password-service/forgot-password-service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  private _user: User;
  private _passwordForm: FormGroup;
  private _jsonUrl: string;
  private wrongPassword: string = "The passwords are not the same!";

  constructor(private _resetPasswordService: ResetPasswordService, private _formBuilder: FormBuilder,
              private _customValidator: CustomvalidationService, private _httpClient: HttpClient,
              private _forgotPasswordService: ForgotPasswordService) {
    this.jsonUrl = 'http://localhost:8083/';
  }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      passwordConfirm: ['', Validators.required,]
    });
  }

  resetPassword(user) {
    this.resetPasswordService.resetPassword(user);
  }

  passwordChange() {
    let password = this.passwordForm.value.password;
    let passwordConfirm = this.passwordForm.value.passwordConfirm
    if (password == passwordConfirm) {
      this.forgotPasswordService.user.password = password;
      this.user = new User(this.forgotPasswordService.user.id, this.forgotPasswordService.user.home,
        this.forgotPasswordService.user.email, this.forgotPasswordService.user.username, this.forgotPasswordService.user.password,
        this.forgotPasswordService.user.birthday, this.forgotPasswordService.user.gender, this.forgotPasswordService.user.secretQuestion,
        this.forgotPasswordService.user.activeEwamon,
        this.forgotPasswordService.user.money, this.forgotPasswordService.user.gameID);
      this.resetPassword(this.user);
    } else
      return null;
  }

  get resetPasswordService(): ResetPasswordService {
    return this._resetPasswordService;
  }

  set resetPasswordService(value: ResetPasswordService) {
    this._resetPasswordService = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get passwordForm(): FormGroup {
    return this._passwordForm;
  }

  set passwordForm(value: FormGroup) {
    this._passwordForm = value;
  }

  get formBuilder(): FormBuilder {
    return this._formBuilder;
  }

  set formBuilder(value: FormBuilder) {
    this._formBuilder = value;
  }

  get customValidator(): CustomvalidationService {
    return this._customValidator;
  }

  set customValidator(value: CustomvalidationService) {
    this._customValidator = value;
  }

  get httpClient(): HttpClient {
    return this._httpClient;
  }

  set httpClient(value: HttpClient) {
    this._httpClient = value;
  }

  get jsonUrl(): string {
    return this._jsonUrl;
  }

  set jsonUrl(value: string) {
    this._jsonUrl = value;
  }

  get forgotPasswordService(): ForgotPasswordService {
    return this._forgotPasswordService;
  }

  set forgotPasswordService(value: ForgotPasswordService) {
    this._forgotPasswordService = value;
  }
}
