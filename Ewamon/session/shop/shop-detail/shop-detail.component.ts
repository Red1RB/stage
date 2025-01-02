import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ItemService} from "../../../../services/item-service/item.service";
import {Item} from "../../../../models/item/item";
import {ShopService} from "../../../../services/shop-service/shop.service";
import {EwamonService} from "../../../../services/ewamon-service/ewamon.service";
import {Ewamon} from "../../../../models/ewamon/ewamon";
import {User} from "../../../../models/user/user";
import {UserService} from "../../../../services/user-service/user.service";


@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.less']
})
export class ShopDetailComponent implements OnInit {
  private _item: Item;
  private _ewamon: Ewamon;
  private _user: User;

  constructor(private _itemService: ItemService, private _ewamonService: EwamonService, private _shopService: ShopService,
              private _userService: UserService, private _activatedRoute: ActivatedRoute, private _router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.selectedEwamon = this.ewamonService.findById(params['id']);
      this.ewamon = Ewamon.copyConstructor(this.selectedEwamon);
    });
  }

  updateMoney(user) {
    this.shopService.moneyUse(user);
  }

  moneyChange() {
    if (confirm("Do you really want that Ewamon?")) {
      this.userService.user.money = this.userService.user.money - this.shopService.selectedEwamon.price;
      this.user = new User(this.userService.user.id, this.userService.user.home,
        this.userService.user.email, this.userService.user.username, this.userService.user.password,
        this.userService.user.birthday, this.userService.user.gender, this.userService.user.secretQuestion,
        this.userService.user.activeEwamon, this.userService.user.money, this.userService.user.gameID);
      this.updateMoney(this.user);
      this.addEwamon();
      this.shopService.onSelect(null);
      this.router.navigate(['home']);
      this.shopService.ewamons = [];
    } else
      return this.shopService.onSelect(null);
  }

  addEwamon() {
    this.shopService.addEwamon(this.selectedEwamon.id, this.user.id);
  }

  get ewamons() {
    return this.shopService.findById();
  }

  get item(): Item {
    return this._item;
  }

  set item(value: Item) {
    this._item = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get itemService(): ItemService {
    return this._itemService;
  }

  set itemService(value: ItemService) {
    this._itemService = value;
  }

  get ewamon(): Ewamon {
    return this._ewamon;
  }

  set ewamon(value: Ewamon) {
    this._ewamon = value;
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

  get userService(): UserService {
    return this._userService;
  }

  set userService(value: UserService) {
    this._userService = value;
  }

  get selectedItem(): Item {
    return this.itemService.selectedItem;
  }

  set selectedItem(value: Item) {
    this.itemService.selectedItem = value;
  }

  get selectedEwamon(): Ewamon {
    return this.ewamonService.selectedEwamon;
  }

  set selectedEwamon(value: Ewamon) {
    this.ewamonService.selectedEwamon = value;
  }

  get activatedRoute(): ActivatedRoute {
    return this._activatedRoute;
  }

  set activatedRoute(value: ActivatedRoute) {
    this._activatedRoute = value;
  }

  get router(): Router {
    return this._router;
  }

  set router(value: Router) {
    this._router = value;
  }
}
