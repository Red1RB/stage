import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services/auth-service/authentication.service";
import {LoginService} from "../../../services/login-service/login.service";
import {UserService} from "../../../services/user-service/user.service";
import {CreateGameService} from "../../../services/create-game/create-game.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private _authenticationService: AuthenticationService,
              private _loginService: LoginService, private _userService: UserService,
              private _gameService: CreateGameService, private _router: Router) {
  }

  ngOnInit(): void {
  }

  opponentJoined() {
    this.gameService.opponentJoined();
  }

  userLeftLobbyOnRefresh() {
    this.gameService.userLeftLobbyOnRefresh();
  }

  searchedUser() {
    this.userService.getSearchedUser(this.userService.searchUsername);
  }

  isLoggedIn() {
    return this._loginService.isLoggedIn();
  }

  logout() {
    this._authenticationService.logout();
  }

  get gameStarted() {
    return this.gameService.gameStarted;
  }

  get opponentMessage() {
    return this.gameService.opponentMessage;
  }

  get notificationString() {
    return this.gameService.notification;
  }

  get opponentProfileImage() {
    return this.gameService.opponentProfileImage;
  }

  get authenticationService(): AuthenticationService {
    return this._authenticationService;
  }

  set authenticationService(value: AuthenticationService) {
    this._authenticationService = value;
  }

  get loginService(): LoginService {
    return this._loginService;
  }

  set loginService(value: LoginService) {
    this._loginService = value;
  }

  get userService(): UserService {
    return this._userService;
  }

  set userService(value: UserService) {
    this._userService = value;
  }

  get gameService(): CreateGameService {
    return this._gameService;
  }

  set gameService(value: CreateGameService) {
    this._gameService = value;
  }

  get router(): Router {
    return this._router;
  }

  set router(value: Router) {
    this._router = value;
  }
}
