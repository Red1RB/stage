import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ShopService} from "../../../services/shop-service/shop.service";
import {HttpClient} from "@angular/common/http";
import {Ewamon} from "../../../models/ewamon/ewamon";
import {EwamonService} from "../../../services/ewamon-service/ewamon.service";
import {UserService} from "../../../services/user-service/user.service";
import {interval, Subscription} from "rxjs";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  private _loadShop: Subscription;

  constructor(private _ewamonService: EwamonService, private _shopService: ShopService,
              private _userService: UserService, private _router: Router,
              private _activatedRoute: ActivatedRoute, private _httpClient: HttpClient) {
    this.loadShop = interval(500).subscribe(() => {
      if (this.shopService.ewamons.length <= 0) {
        this.shopService.ewamons = [];
        this.shopService.restGetOffers();
      }
    });
  }

  ngOnInit(): void {
    this.userEwamon();
    this.ewamons;
    this.getUser();
  }

  ngOnDestroy() {
    this.loadShop.unsubscribe();
  }

  getUser() {
    this.userService.profile();
  }

  userEwamon() {
    this.userService.userEwamon();
  }

  onSelect(ewamon: Ewamon) {
    this.shopService.onSelect(ewamon);
  }

  get httpClient(): HttpClient {
    return this._httpClient;
  }

  set httpClient(value: HttpClient) {
    this._httpClient = value;
  }

  get userService(): UserService {
    return this._userService;
  }

  set userService(value: UserService) {
    this._userService = value;
  }

  get ewamons() {
    return this.shopService.findAll();
  }

  get ewamonService(): EwamonService {
    return this._ewamonService;
  }

  set ewamonService(value: EwamonService) {
    this._ewamonService = value;
  }

  get shopService(): ShopService {
    return this._shopService;
  }

  set shopService(value: ShopService) {
    this._shopService = value;
  }

  get selectedEwamon(): Ewamon {
    return this.ewamonService.selectedEwamon;
  }

  set selectedEwamon(value: Ewamon) {
    this.ewamonService.selectedEwamon = value;
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

  get loadShop(): Subscription {
    return this._loadShop;
  }

  set loadShop(value: Subscription) {
    this._loadShop = value;
  }
}
