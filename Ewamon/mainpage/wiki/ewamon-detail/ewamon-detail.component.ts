import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Ewamon} from "../../../../models/ewamon/ewamon";
import {EwamonService} from "../../../../services/ewamon-service/ewamon.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment.staging";

@Component({
  selector: 'app-wiki-detail',
  templateUrl: './ewamon-detail.component.html',
  styleUrls: ['./ewamon-detail.component.less']
})
export class EwamonDetailComponent implements OnInit {

  private _ewamon: Ewamon;
  private _copiedEwamon: Ewamon;
  private _jsonURL = 'http://localhost:8083/';
  private _allEwamon: Ewamon;

  constructor(private _http: HttpClient, private _ewamonService: EwamonService, public router: Router, public activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.ewamon = this._ewamonService.findById(params['id']);
      this.id = params['id'];
    });
  }

  allEwamons() {
    this.http.get<Ewamon>(`${environment.apiUrl}/ewamons/all`).subscribe(data => {
      return this.allEwamon = data;
    })
  }

  get selectedEwamon(): Ewamon {
    return this._ewamonService.selectedEwamon;
  }

  set selectedEwamon(value: Ewamon) {
    this._ewamonService.selectedEwamon = value;
  }

  get id(): number {
    return this._ewamonService.id;
  }

  set id(value: number) {
    this._ewamonService.id = value;
  }

  get ewamon(): Ewamon {
    return this._ewamon;
  }

  set ewamon(value: Ewamon) {
    this._ewamon = value;
  }

  get copiedEwamon(): Ewamon {
    return this._copiedEwamon;
  }

  set copiedEwamon(value: Ewamon) {
    this._copiedEwamon = value;
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

  get allEwamon(): Ewamon {
    return this._allEwamon;
  }

  set allEwamon(value: Ewamon) {
    this._allEwamon = value;
  }

  getNextEwamon() {
    this.id++;
    if (this.id > 13) {
      this.id = 1;
    }

    this.ewamon = this._ewamonService.findById(this.id);
    this.router.navigate(["wiki/ewamon/" + this.id]);
  }

  getPreviousEwamon() {
    this.id--;
    if (this.id < 1) {
      this.id = 13;
    }

    this.ewamon = this._ewamonService.findById(this.id);
    this.router.navigate(["wiki/ewamon/" + this.id]);
  }

  getItemDetail() {
    this.router.navigate(["wiki/item/" + 1]);
  }
}
