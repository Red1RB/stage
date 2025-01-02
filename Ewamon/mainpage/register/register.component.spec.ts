import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "../../../app-routing.module";
import {RegisterComponent} from "./register.component";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule, HttpClientModule, AppRoutingModule]
    })
      .compileComponents();
  });

  it('should create the app registerComponent', () => {
    const fixture = TestBed.createComponent(RegisterComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should check if username field is invalid', () => {
    let username = component.signupForm.controls['username']; // variable for the username on the signupForm
    expect(username.valid).toBeFalsy(); // Expects the validation to be false
    expect(username.pristine).toBeTruthy(); // If the input hasnt been touched yet it should be true
    expect(username.errors['required']).toBeTruthy();
    username.setValue(''); // Sets the input value to empty

    expect(username.errors['required']).toBeTruthy(); // Expects the validation error to be true
  });

  it('should check if password field is invalid', () => {
    let password = component.signupForm.controls['username'];
    expect(password.valid).toBeFalsy();
    expect(password.pristine).toBeTruthy();
    expect(password.errors['required']).toBeTruthy();
    password.setValue('');

    expect(password.errors['required']).toBeTruthy();
  });

  it('should check if email field is invalid', () => {
    let email = component.signupForm.controls['email'];
    expect(email.valid).toBeFalsy();
    expect(email.pristine).toBeTruthy();
    expect(email.errors['required']).toBeTruthy();
    email.setValue('');

    expect(email.errors['required']).toBeTruthy();
  });
});
