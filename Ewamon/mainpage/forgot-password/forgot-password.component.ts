import { Component, OnInit } from '@angular/core';
import {Validators} from "@angular/forms";
import {ForgotPasswordService} from "../../../services/forgot-password-service/forgot-password-service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {


  constructor(private _forgotPasswordService: ForgotPasswordService) { }

  ngOnInit(): void {
    this.forgotPasswordService.forgotForm = this.forgotPasswordService.formBuilder.group({
      username: ['', Validators.required],
      secretQuestion: ['', Validators.required]
    });
  }

  get forgotPasswordService(): ForgotPasswordService {
    return this._forgotPasswordService;
  }

  set forgotPasswordService(value: ForgotPasswordService) {
    this._forgotPasswordService = value;
  }

  forgotSubmit() {
    this.forgotPasswordService.forgotSubmit();
  }
}
