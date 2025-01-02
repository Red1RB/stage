import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user-service/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = "fdfsdfdsf";

  constructor(private _userService: UserService) {
  }

  ngOnInit(): void {
    this.userEwamon()
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
}
