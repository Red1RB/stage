import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Map} from "../../../../models/map/map";
import {MapService} from "../../../../services/map-service/map.service";

@Component({
  selector: 'app-map-detail',
  templateUrl: './map-detail.component.html',
  styleUrls: ['./map-detail.component.less']
})
export class MapDetailComponent implements OnInit {

  private _map: Map;
  private _copiedMap: Map;

  constructor(private _mapService: MapService, public router: Router, public activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.map = this._mapService.findById(params['id']);
      this.id = params['id'];
    });
  }

  get selectedMap(): Map {
    return this._mapService.selectedMap;
  }

  set selectedMap(value: Map) {
    this._mapService.selectedMap = value;
  }

  get map(): Map {
    return this._map;
  }

  set map(value: Map) {
    this._map = value;
  }

  get copiedMap(): Map {
    return this._copiedMap;
  }

  set copiedMap(value: Map) {
    this._copiedMap = value;
  }


  get id(): number {
    return this._mapService.id;
  }

  set id(value: number) {
    this._mapService.id = value;
  }

  getNextmap() {
    this.id++;
    if (this.id > 3) {
      this.id = 1;
    }
    this.map = this._mapService.findById(this.id);
    this.router.navigate(["wiki/map/" + this.id]);
  }

  getPreviousMap() {
    this.id--;
    if (this.id < 1) {
      this.id = 3
    }
    this.map = this._mapService.findById(this.id);
    this.router.navigate(["wiki/map/" + this.id]);
  }

  getItemDetail() {
    this.router.navigate(["wiki/item/" + 1]);
  }

  getCharacterDetail() {
    this.router.navigate(["wiki/character/" + 1]);
  }

}
