import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Captain } from '../models/captain.model';
import { Team } from '../models/team.model';


@Injectable()
export class DraftService {
  TeamList: AngularFireList<any>;
  selectedTeam: Team = new Team();

  constructor(private firebase: AngularFireDatabase ) { }

  getData() {
    this.TeamList = this.firebase.list('teams');
    return this.TeamList;
  }

  insertTeam(clan, player) {
    // const teamsRef = firebase.database().ref('teams/' + clan + '/');
    console.log(clan, player);
    this.TeamList.push({
      clan: clan,
      player: player,
      // color1: captain.color1,
      // color2: captain.color2
    });
  }

  updateTeam(key, clan) {
    this.TeamList.update(key,
      {
        clan: clan,
        // color1: captain.color1,
        // color2: captain.color2
      });
  }

  deleteTeam($key: string) {
    this.TeamList.remove($key);
  }

  deleteAllTeams() {
    this.TeamList.remove();
  }

}
