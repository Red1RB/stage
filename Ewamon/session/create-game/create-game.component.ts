import { Component, OnInit } from '@angular/core';
import {CreateGameService} from "../../../services/create-game/create-game.service";
import {Ewamon} from "../../../models/ewamon/ewamon";
import {HttpClient} from "@angular/common/http";
import {interval, Observable, Subscription} from "rxjs";
import {User} from "../../../models/user/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.less']
})
export class CreateGameComponent implements OnInit {
  readonly _jsonURL = 'http://localhost:8083/';
  private _waitForOpponent: Subscription;

  constructor(private _createGameSerivce: CreateGameService, private _http: HttpClient, private _router: Router) {
    this.createGameSerivce.userLeftLobbyOnRefresh();

    this.createGameSerivce.lobbyReload = interval(3000).subscribe(() => {
      this.createGameSerivce.opponentJoined();
    });
  }

  ngOnInit(): void {
    this.createGameSerivce.getUserEwamonsById();
    this.createGameSerivce.getActiveEwamonData();
  }

  ngOnDestroy(): void {
    this.router.events.subscribe((val) => {
      if (this.router.url.indexOf("/battle/") > -1) {

      } else {
        this.createGameSerivce.userLeftLobbyOnRefresh();
      }
    }, error => console.log(""));
  }



  chosenEwamon() {
    return this.createGameSerivce.userEwamon();
  }

  deleteGameLobby() {
    this.createGameSerivce.leaveQueue();
  }

  lobbyActivated() {
    this.createGameSerivce.insertGameLobby(1, 1);
  }

  incrementIndexEwamon() {
    if (this.index + 1 == this.userEwamons.length) {
      this.index = this.userEwamons.length - 1;
    } else {
      this.index++;
    }

    return this.firstEwamon(this.index);
  }

  decreaseindexEwamon() {
    if (this.index == 0 || this.index < 0) {
      this.index = 0;
    } else {
      this.index--;
    }

    return this.firstEwamon(this.index)
  }

  firstEwamon(index) {
    this.createGameSerivce.getUserById(sessionStorage.getItem('id')).subscribe(data => {
      this.http.get<Ewamon[]>(this._jsonURL + "ewamons/all").subscribe(ewamon => {
        for (let i = 0; i < ewamon.length; i++) {
          if (ewamon[i].name == data.activeEwamon) {
            this.createGameSerivce.userEwamonImagepath = ewamon[i].imagepathFront;

            this.http.get<Ewamon[]>(this._jsonURL + "ewamons/" + ewamon[i].id).subscribe(userEwamon => {
              this.createGameSerivce.userEwamons = userEwamon;
            });
          }
        }
      })
    });

    this.createGameSerivce.userEwamonImagepath = this.createGameSerivce.userEwamons[index].imagepathFront;
    return this.createGameSerivce.userEwamons[index];
  }

  getuserById(id) {
    this.createGameSerivce.getUserById(id);
  }

  get createGameSerivce(): CreateGameService {
    return this._createGameSerivce;
  }

  set createGameSerivce(value: CreateGameService) {
    this._createGameSerivce = value;
  }

  get index(): number {
    return this.createGameSerivce.index;
  }

  set index(value: number) {
    this.createGameSerivce.index = value;
  }

  get userEwamons() {
    return this.createGameSerivce.userEwamons;
  }

  get lobbyCreated(): boolean {
    return this.createGameSerivce.lobbyCreated;
  }

  set lobbyCreated(value: boolean) {
    this.createGameSerivce.lobbyCreated = value;
  }

  get http(): HttpClient {
    return this._http;
  }

  set http(value: HttpClient) {
    this._http = value;
  }

  get waitForOpponent(): Subscription {
    return this._waitForOpponent;
  }

  set waitForOpponent(value: Subscription) {
    this._waitForOpponent = value;
  }

  get router(): Router {
    return this._router;
  }

  set router(value: Router) {
    this._router = value;
  }
}
