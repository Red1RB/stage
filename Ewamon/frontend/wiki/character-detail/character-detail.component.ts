import {Component, OnInit} from '@angular/core';
import {Character} from "../../../../models/character/character";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CharacterService} from "../../../../services/character-service/character.service";

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.less']
})
export class CharacterDetailComponent implements OnInit {

  private _character: Character;
  private _copiedCharacter: Character;

  constructor(private _characterService: CharacterService, public router: Router, public activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.character = this._characterService.findById(params['id']);
      this.id = params['id'];
    });
  }

  get selectedCharacter(): Character {
    return this._characterService.selectedCharacter;
  }

  set selectedCharacter(value: Character) {
    this._characterService.selectedCharacter = value;
  }


  get character(): Character {
    return this._character;
  }

  set character(value: Character) {
    this._character = value;
  }

  get copiedCharacter(): Character {
    return this._copiedCharacter;
  }

  set copiedCharacter(value: Character) {
    this._copiedCharacter = value;
  }

  get characterService(): CharacterService {
    return this._characterService;
  }

  set characterService(value: CharacterService) {
    this._characterService = value;
  }

  get id(): number {
    return this._characterService.id;
  }

  set id(value: number) {
    this._characterService.id = value;
  }

  getNextCharacter() {
    this.id++;
    if (this.id > 3) {
      this.id = 1;
    }
    this.character = this.characterService.findById(this.id);
    this.router.navigate(["wiki/character/" + this.id]);
  }

  getPreviousCharacter() {
    this.id--;
    if (this.id < 1) {
      this.id = 3
    }
    this.character = this.characterService.findById(this.id);
    this.router.navigate(["wiki/character/" + this.id]);
  }

  getMapDetail() {
    this.router.navigate(["wiki/map/" + 1]);
  }
}
