import {Component, OnInit} from '@angular/core';
import {BattleService} from "../../../services/battle-service/battle.service";
import {Move} from "../../../models/move/move";
import {CreateGameService} from "../../../services/create-game/create-game.service";
import {interval, Observable} from "rxjs";
import {User} from "../../../models/user/user";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user-service/user.service";

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
  private readonly _dataURL: string = "http://localhost:8083/";
  private _user: User;

  constructor(private _battleService: BattleService, private _gameService: CreateGameService, private _http: HttpClient,
              private _router: Router, private _activatedRoute: ActivatedRoute, private _userService: UserService) {
    this.battleService.checkTurns = interval(1000).subscribe(() => {
      this.battleService.getUserByUsername(this.myUsername).subscribe(user => {
        this.battleService.checkTurnsAndHp(user);
        this.battleService.notiftyPlayer(user);
      }, error => console.log(""));
    });
  }


  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    sessionStorage.setItem('lobbyId', null);
    this.battleService.checkTurns.unsubscribe();
    this.battleService.deleteUserFromGame(sessionStorage.getItem('id')).subscribe();
    this.gameService.lobbyCreated = false;
  }

  get battleService(): BattleService {
    return this._battleService;
  }

  playerEntrance() {
    return this.battleService.playerEntrance();
  }

  myTurn() {
    return this.battleService.myTurn();
  }

  get enemiesUsername(): string {
    return this.battleService.enemiesUsername;
  }

  get enemiesEwamonImagepath(): string {
    return this.battleService.enemiesEwamonImagepath;
  }

  get enemiesEwamonHp(): number {
    return this.battleService.enemiesEwamonHp;
  }

  get enemiesCurrentHp(): number {
    return this.battleService.enemiesCurrentHp;
  }

  get myEwamonImagepathBack(): string {
    return this.battleService.myEwamonImagepathBack;
  }

  get myEwamonHp(): number {
    return this.battleService.myEwamonHp;
  }

  get myEwamonCurrentHp(): number {
    return this.battleService.myEwamonCurrentHp;
  }

  get myUsername(): string {
    return this.battleService.myUsername;
  }

  get myMoves(): Move[] {
    return this.battleService.myMoves;
  }

  get myEwamonType(): string {
    return this.battleService.myEwamonType;
  }

  get myTurnEnded(): boolean {
    return this.battleService.myTurnStarted;
  }

  get hideArrow(): boolean {
    return this.battleService.hideArrow;
  }

  get gameService(): CreateGameService {
    return this._gameService;
  }

  set gameService(value: CreateGameService) {
    this._gameService = value;
  }

  get http(): HttpClient {
    return this._http;
  }

  set http(value: HttpClient) {
    this._http = value;
  }

  get router(): Router {
    return this._router;
  }

  set router(value: Router) {
    this._router = value;
  }

  get activatedRoute(): ActivatedRoute {
    return this._activatedRoute;
  }

  set activatedRoute(value: ActivatedRoute) {
    this._activatedRoute = value;
  }

  get dataURL(): string {
    return this._dataURL;
  }

  get userService(): UserService {
    return this._userService;
  }

  set userService(value: UserService) {
    this._userService = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }
}
