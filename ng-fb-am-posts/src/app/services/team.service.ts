import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Team } from '../models/team.model';

@Injectable()
export class TeamService {
  TeamList: AngularFireList<any>;
  selectedTea: Team = new Team();

  constructor(private firebase: AngularFireDatabase) {}

  getData() {
    this.TeamList = this.firebase.list('teams');
    return this.TeamList;
  }

}
