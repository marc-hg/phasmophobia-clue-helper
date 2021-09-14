import { GhostsService } from './../../services/ghosts/ghosts.service';
import { Component, OnInit } from '@angular/core';
import { Ghost } from './../../models/Ghost';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  ghosts: Ghost[];
  filteredGhosts: Ghost[];
  clues: Ghost = {
    spirit_box: false,
    fingerprints: false,
    freezing_temperature: false,
    ghost_writting: false,
    emf_level_5: false,
    ghost_orb: false,
  } as Ghost;

  constructor(public ghostService: GhostsService) {}

  ngOnInit(): void {
    this.ghostService.ghosts.subscribe((response) => {
      this.ghosts = (response as Ghost[]).sort((a, b) => {
        return a.name > b.name ? 1 : -1;
      });

      this.filteredGhosts = this.ghosts;
    });
  }

  onChangeClue() {
    this.filteredGhosts = this.ghosts.filter((ghost: Ghost) => {
      return this._checkClueMatches(ghost);
    });
  }

  private _checkClueMatches(ghost: Ghost) {
    for (let [key, value] of Object.entries(this.clues)) {
      // if clue attribute is true but same ghost attribute is false then it does not match
      if (value && !ghost[key]) {
        return false;
      }
    }
    return true;
  }

  ghostToClues(ghost: Ghost) {
    const clue_dict = {
      spirit_box: 'Spirit box',
      fingerprints: 'Fingerprints',
      freezing_temperature: 'Freezing temperature',
      ghost_writting: 'Ghost writting',
      emf_level_5: 'EMF level 5',
      ghost_orb: 'Ghost orb',
    };

    const validKeys: string[] = Object.keys(ghost).filter((key: string) => {
      return key in clue_dict;
    });
    const validKeysValues: string[] = validKeys.map(
      (key: string) => clue_dict[key]
    );

    return validKeysValues;
  }
}
