import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {RegisterService} from "../../../services/register-service/register.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {CustomvalidationService} from "../../../services/customvalidation-service/customvalidation.service";
import {User} from "../../../models/user/user";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment.staging";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {

  private _signupForm: FormGroup;
  submitted: boolean = false;
  private _jsonURL = 'http://localhost:8083/';
  private _userExists = false;


  @ViewChild("bubbleText") bubbleText: ElementRef;

  constructor(private fb: FormBuilder, private customValidator: CustomvalidationService, private _registerService: RegisterService, private formBuilder: FormBuilder, private _http: HttpClient, private route: Router) {
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required],
      username: ['', [Validators.required], this.customValidator.userNameValidator.bind(this.customValidator)],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      birthday: ['', Validators.required],
      home: ['', Validators.required],
      gender: ['', Validators.required],
      secretQuestion: ['', Validators.required]
    });

    this.userExists = false;
  }

  spaceEvent() {
    if (this.pressSpaceToStart == "Click when you are ready!") {
      this.spaceClicked;
    }

    // Will prevent scrolling on space click
    // this.bubbleText.nativeElement.preventDefault();
  }

  checkDuplicateUsers() {
    const username = this.signupForm.value.username;

    this.checkDuplicateUsernames(username).subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].username == username) {
          this.userExists = true;
        } else {
          this.userExists = false;
        }
      }
    });
  }

  checkDuplicateUsernames(username): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}users/getEmails/` + username);
  }

  signUp() {
    const email = this.signupForm.value.email;
    const username = this.signupForm.value.username;
    const password = this.signupForm.value.password;
    const birthday = this.signupForm.value.birthday;
    const home = this.signupForm.value.home;
    const gender = this.signupForm.value.gender;
    const money = 1000;
    const secretQuestion = this.signupForm.value.secretQuestion;

    let addedUser = {
      email: email,
      username: username,
      password: password,
      birthday: birthday,
      home: home,
      gender: gender,
      money: money,
      secretQuestion: secretQuestion
    }
      this.http.post<User>(`${environment.apiUrl}users/addUser`, addedUser).subscribe(data => {
        alert("Signup Succes");
        this.submitted = true;
        this.signupForm.reset();
        this.route.navigate(['login']);
      });
  }

  get registerFormControl() {
    return this._signupForm.controls;
  }

  get registerService(): RegisterService {
    return this._registerService;
  }

  get emailInputVisibility() {
    return this.registerService.emailInputVisiblity;
  }

  get usernameInputVisibility() {
    return this.registerService.usernameInputVisiblity;
  }

  get passwordInputVisibility() {
    return this.registerService.passwordInputVisiblity;
  }

  get birthdayInputVisibility() {
    return this.registerService.birtdayInputVisiblity;
  }

  get homeInputVisibility() {
    return this.registerService.homeInputVisiblity;
  }

  get secretQuestionInputVisibility() {
    return this.registerService.secretQuestionInputVisibility;
  }

  get genderInputVisibility() {
    return this.registerService.genderInputVisiblity;
  }

  get continueButtonVisibility() {
    return this.registerService.continueButtonVisibility;
  }

  get registerButtonVisibility() {
    return this.registerService.registerButtonVisibility;
  }

  get input() {
    return this.registerService.input(this.bubbleText);
  }

  get spaceClicked() {
    return this.registerService.spaceClicked(this.bubbleText);
  }

  get pressSpaceToStart() {
    return this.registerService.pressSpaceToStart;
  }

  get http(): HttpClient {
    return this._http;
  }

  set http(value: HttpClient) {
    this._http = value;
  }

  get jsonURL(): string {
    return this._jsonURL;
  }

  set jsonURL(value: string) {
    this._jsonURL = value;
  }

  get signupForm(): FormGroup {
    return this._signupForm;
  }

  set signupForm(value: FormGroup) {
    this._signupForm = value;
  }

  get userExists(): boolean {
    return this._userExists;
  }

  set userExists(value: boolean) {
    this._userExists = value;
  }
}
