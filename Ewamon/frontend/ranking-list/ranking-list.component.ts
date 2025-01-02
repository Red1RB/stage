import {Component, OnInit} from '@angular/core';
import {RankingService} from "../../../services/ranking-service/ranking.service";

@Component({
  selector: 'app-ranking-list',
  templateUrl: './ranking-list.component.html',
  styleUrls: ['./ranking-list.component.css']
})
export class RankingListComponent implements OnInit {

  constructor(private _rankingService: RankingService) {
  }

  ngOnInit(): void {
  }

  searchedProfile(i) {
    return this.rankingService.seeProfile(i);
  }

  get imagePaths() {
    return this.rankingService.imageSources;
  }

  get userWins() {
    return this.rankingService.userWins;
  }

  get rankingService(): RankingService {
    return this._rankingService;
  }

  set rankingService(value: RankingService) {
    this._rankingService = value;
  }
}
