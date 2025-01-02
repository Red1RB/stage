import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {LoginService} from "../../../services/login-service/login.service";
import {CreateGameService} from "../../../services/create-game/create-game.service";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {

  constructor(private _loginService: LoginService, private _gameService: CreateGameService) {
  }

  ngOnInit(): void {
    this.loginService.loginForm = this.loginService.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get loginService(): LoginService {
    return this._loginService;
  }

  set loginService(value: LoginService) {
    this._loginService = value;
  }

  get gameService(): CreateGameService {
    return this._gameService;
  }

  set gameService(value: CreateGameService) {
    this._gameService = value;
  }

  login() {
    this.loginService.login();
  }
}
