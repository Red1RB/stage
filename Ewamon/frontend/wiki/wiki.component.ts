import {Component, OnInit} from '@angular/core';
import {Ewamon} from "../../../models/ewamon/ewamon";
import {EwamonService} from "../../../services/ewamon-service/ewamon.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ItemService} from "../../../services/item-service/item.service";
import {Item} from "../../../models/item/item";
import {Map} from "../../../models/map/map";
import {MapService} from "../../../services/map-service/map.service";
import {Character} from "../../../models/character/character";
import {CharacterService} from "../../../services/character-service/character.service";
import {HttpClient} from "@angular/common/http";
import {Move} from "../../../models/move/move";
import {UserService} from "../../../services/user-service/user.service";
import {environment} from "../../../../environments/environment.staging";


@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.less'],
  providers: [EwamonService]
})
export class WikiComponent implements OnInit {

  private _jsonURL = 'http://localhost:8083/';
  private _allEwamon: Ewamon[];
  private _allEwamonMove: Move[];
  private _index: number = 0;
  private _indexMove: number = 0;


  constructor(private _userService: UserService, private _http: HttpClient, private _characterService: CharacterService, private _mapService: MapService, private _itemService: ItemService, private _ewamonService: EwamonService, private _router: Router, private _activatedRoute: ActivatedRoute) {
    this.userEwamon();
  }

  ngOnInit() {

    this.allEwamons();

    this.allEwamonMoves();
  }

  allEwamons() {
    this.http.get<Ewamon[]>(`${environment.apiUrl}ewamons/all`).subscribe(data => {
      this.allEwamon = data;
    });
  }

  allEwamonMoves() {
    return this.http.get<Move[]>(`${environment.apiUrl}ewamons/allMoves`).subscribe(data => {
      this.allEwamonMove = data;
    });
  }

  getNextEwamon() {
    this.index++;

    if (this.index == 0) {
      this.indexMove = 0;
    }

    if (this.index == 1) {
      this.indexMove = 68;
    }

    if (this.index == 2) {
      this.indexMove = 4;
    }

    if (this.index == 3) {
      this.indexMove = 4;
    }

    if (this.index == 4) {
      this.indexMove = 8;
    }

    if (this.index == 5) {
      this.indexMove = 8;
    }

    if (this.index == 6) {
      this.indexMove = 44;
    }

    if (this.index == 7) {
      this.indexMove = 16;
    }

    if (this.index == 8) {
      this.indexMove = 12;
    }

    if (this.index == 9) {
      this.indexMove = 52;
    }

    if (this.index == 10) {
      this.indexMove = 48;
    }

    if (this.index == 11) {
      this.indexMove = 32;
    }

    if (this.index == 12) {
      this.indexMove = 24;
    }
    this.allEwamon[this.index];
    this.allEwamonMove[this.indexMove];

    if (this.index == 14) {
      this.index = 0;
    }

    if (this.index >= 13) {
      this.indexMove = 0;
    }

  }

  getPreviousEwamon() {

    if (this.index == 1) {
      this.indexMove = 0;
    }

    if (this.index == 2) {
      this.indexMove = 68;
    }

    if (this.index == 3) {
      this.indexMove = 4;
    }

    if (this.index == 4) {
      this.indexMove = 4;
    }

    if (this.index == 5) {
      this.indexMove = 8;
    }

    if (this.index == 6) {
      this.indexMove = 8;
    }

    if (this.index == 7) {
      this.indexMove = 44;
    }

    if (this.index == 8) {
      this.indexMove = 16;
    }

    if (this.index == 9) {
      this.indexMove = 12;
    }

    if (this.index == 10) {
      this.indexMove = 52;
    }

    if (this.index == 11) {
      this.indexMove = 48;
    }

    if (this.index == 12) {
      this.indexMove = 32;
    }

    if (this.index == 13) {
      this.indexMove = 24;
    }

    this.index--;
    this.allEwamon[this.index];
    this.allEwamonMove[this.index];


    if (this.index < 0) {
      this.index = 13;
    }
  }

  get characterService(): CharacterService {
    return this._characterService;
  }

  set characterService(value: CharacterService) {
    this._characterService = value;
  }

  get mapService(): MapService {
    return this._mapService;
  }

  set mapService(value: MapService) {
    this._mapService = value;
  }

  get itemService(): ItemService {
    return this._itemService;
  }

  set itemService(value: ItemService) {
    this._itemService = value;
  }

  get ewamonService(): EwamonService {
    return this._ewamonService;
  }

  get selectedEwamon(): Ewamon {
    return this.ewamonService.selectedEwamon;
  }

  set selectedEwamon(value: Ewamon) {
    this.ewamonService.selectedEwamon = value;
  }

  get selectedItem(): Item {
    return this.itemService.selectedItem;
  }

  set selectedItem(value: Item) {
    this.itemService.selectedItem = value;
  }

  get selectedMap(): Map {
    return this.mapService.selectedMap;
  }

  set selectedMap(value: Map) {
    this.mapService.selectedMap = value;
  }

  get selectedCharacter(): Character {
    return this.characterService.selectedCharacter;
  }

  set selectedCharacter(value: Character) {
    this.characterService.selectedCharacter = value;
  }

  get ewamons(): Ewamon[] {
    return this.ewamonService.ewamons;
  }

  get yahit(): Ewamon {
    return this.ewamonService.findById(1);
  }

  get potion(): Item {
    return this.itemService.findById(1);
  }

  get grassmap(): Map {
    return this.mapService.findById(1);
  }

  get ian(): Character {
    return this.characterService.findById(1);
  }

  get id(): number {
    return this.ewamonService.id;
  }

  set id(value: any) {
    this.ewamonService.id = value;
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

  get allEwamon(): Ewamon[] {
    return this._allEwamon;
  }

  set allEwamon(value: Ewamon[]) {
    this._allEwamon = value;
  }

  get index(): number {
    return this._index;
  }

  set index(value: number) {
    this._index = value;
  }

  get allEwamonMove(): Move[] {
    return this._allEwamonMove;
  }

  set allEwamonMove(value: Move[]) {
    this._allEwamonMove = value;
  }

  get userService(): UserService {
    return this._userService;
  }

  set userService(value: UserService) {
    this._userService = value;
  }

  userEwamon() {
    this.userService.userEwamon();
  }

  get indexMove(): number {
    return this._indexMove;
  }

  set indexMove(value: number) {
    this._indexMove = value;
  }
}
