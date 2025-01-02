import {Component, OnInit} from '@angular/core';
import {RegisterService} from "../../../services/register-service/register.service";
import {Ewamon} from "../../../models/ewamon/ewamon";
import {EwamonService} from "../../../services/ewamon-service/ewamon.service";
import {UserService} from "../../../services/user-service/user.service";
import {ShopService} from "../../../services/shop-service/shop.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-choosestarter',
  templateUrl: './choosestarter.component.html',
  styleUrls: ['./choosestarter.component.css']
})
export class ChoosestarterComponent implements OnInit {

  private _ewamon: Ewamon[];

  constructor(private _registerService: RegisterService, private _ewamonService: EwamonService,
              private _userService: UserService, private _shopService: ShopService, private _router: Router) {
  }

  ngOnInit(): void {
    this.ewamons;
  }

  addstarter(eId, uId) {
    return this.userService.addStarter(eId, uId);
  }

  get registerService(): RegisterService {
    return this._registerService;
  }

  set registerService(value: RegisterService) {
    this._registerService = value;
  }

  get chooseStarter() {
    return this.registerService.chooseStarter;
  }

  get ewamonService(): EwamonService {
    return this._ewamonService;
  }

  get ewamon(): Ewamon[] {
    return this._ewamon;
  }

  set ewamon(value: Ewamon[]) {
    this._ewamon = value;
  }

  set ewamonService(value: EwamonService) {
    this._ewamonService = value;
  }

  get userService(): UserService {
    return this._userService;
  }

  set userService(value: UserService) {
    this._userService = value;
  }

  get shopService(): ShopService {
    return this._shopService;
  }

  set shopService(value: ShopService) {
    this._shopService = value;
  }

  get ewamons() {
    return this.shopService.findAll();
  }

  get router(): Router {
    return this._router;
  }

  set router(value: Router) {
    this._router = value;
  }
}
