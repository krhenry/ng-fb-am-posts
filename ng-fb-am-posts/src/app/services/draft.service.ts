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

  getTeam(clan) {
    this.TeamList = this.firebase.list('teams/' + clan);
  }

  insertTest(clan, name) {
    this.TeamList = this.firebase.list('teams/' + clan);
    this.TeamList.push({
      player: name
    });
  }

  insertTeam(clan, name) {
    this.TeamList = this.firebase.list('teams/' + clan);
    this.TeamList.push({
      player: name
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
