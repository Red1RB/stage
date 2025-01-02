import {Component, OnInit} from '@angular/core';
import {CreateGameService} from "../../../services/create-game/create-game.service";
import {UserService} from "../../../services/user-service/user.service";
import {interval, Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  private _lobbyReload: Subscription;

  constructor(private _createGameSerivce: CreateGameService, private _userService: UserService, private _router: Router) {
    // Makes sure that the lobby gets refreshed right away.
    this.refreshLobby();

    // Refreshes the lobby every 4 seconds.
    this.lobbyReload = interval(4000).subscribe(() => {
      this.refreshLobby();
    }, error => console.log(""));
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.lobbyReload.unsubscribe();
  }

  refreshLobby() {
    this.createGameSerivce.getAvailableLobbies();
  }

  userEwamon() {
    this.userService.userEwamon();
  }

  joinGame(i) {
    return this.createGameSerivce.joinGame(i);
  }

  get lobbyCreated() {
    return this.createGameSerivce.lobbyCreated;
  }

  set lobbyCreated(value: boolean) {
    this.lobbyCreated = value;
  }

  get availableLobbies() {
    return this.createGameSerivce.availableGames;
  }

  get createGameSerivce(): CreateGameService {
    return this._createGameSerivce;
  }

  set createGameSerivce(value: CreateGameService) {
    this._createGameSerivce = value;
  }

  get userService(): UserService {
    return this._userService;
  }

  set userService(value: UserService) {
    this._userService = value;
  }

  get router(): Router {
    return this._router;
  }

  set router(value: Router) {
    this._router = value;
  }

  get lobbyReload(): Subscription {
    return this._lobbyReload;
  }

  set lobbyReload(value: Subscription) {
    this._lobbyReload = value;
  }
}
