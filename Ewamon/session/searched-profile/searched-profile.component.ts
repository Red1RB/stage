import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user-service/user.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-searched-profile',
  templateUrl: './searched-profile.component.html',
  styleUrls: ['./searched-profile.component.css'],
  providers: [UserService]
})
export class SearchedProfileComponent implements OnInit {
  private _url: any;
  private _defaultProfileUrl: string = 'assets/images/defaultProfilePicture.png';
  private _userId: number;

  constructor(private _userService: UserService, private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userService.getSearchedUser(params['username']);
      this.userId = params['userId'];
    });
    this.userEwamon();
  }

  userEwamon() {
    this.userService.getSearchedUserEwamon(this.userId);
  }

  get userId(): number {
    return this._userId;
  }

  set userId(value: number) {
    this._userId = value;
  }

  get activatedRoute(): ActivatedRoute {
    return this._activatedRoute;
  }

  set activatedRoute(value: ActivatedRoute) {
    this._activatedRoute = value;
  }

  get url(): any {
    return this._url;
  }

  set url(value: any) {
    this._url = value;
  }

  get defaultProfileUrl(): string {
    return this._defaultProfileUrl;
  }

  set defaultProfileUrl(value: string) {
    this._defaultProfileUrl = value;
  }

  get userService(): UserService {
    return this._userService;
  }
}
