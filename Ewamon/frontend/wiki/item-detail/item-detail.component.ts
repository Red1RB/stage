import {Component, OnInit} from '@angular/core';
import {Item} from "../../../../models/item/item";
import {ItemService} from "../../../../services/item-service/item.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.less']
})
export class ItemDetailComponent implements OnInit {

  private _item: Item;
  private _copiedItem: Item;

  constructor(private _itemService: ItemService, public router: Router, public activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.item = this._itemService.findById(params['id']);
      this.id = params['id'];
    });
  }

  get selectedItem(): Item {
    return this._itemService.selectedItem;
  }

  set selectedItem(value: Item) {
    this._itemService.selectedItem = value;
  }

  get item(): Item {
    return this._item;
  }

  set item(value: Item) {
    this._item = value;
  }

  get copiedItem(): Item {
    return this._copiedItem;
  }

  set copiedItem(value: Item) {
    this._copiedItem = value;
  }


  get id(): number {
    return this._itemService.id;
  }

  set id(value: number) {
    this._itemService.id = value;
  }

  getNextItem() {
    this.id++;
    if (this.id > 4) {
      this.id = 1;
    }
    this.item = this._itemService.findById(this.id);
    this.router.navigate(["wiki/item/" + this.id]);
  }

  getPreviousItem() {
    this.id--;
    if (this.id < 1) {
      this.id = 4
    }
    this.item = this._itemService.findById(this.id);
    this.router.navigate(["wiki/item/" + this.id]);
  }

  getEwamonDetail() {
    this.router.navigate(["wiki/ewamon/" + 1]);
  }

  getMapDetail() {
    this.router.navigate(["wiki/map/" + 1]);
  }
}
