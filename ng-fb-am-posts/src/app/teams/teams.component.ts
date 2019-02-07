import { Component, OnInit } from '@angular/core';
import { DraftService } from '../services/draft.service';
import { Team } from '../models/team.model';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teamList: Team[];
  teams: Array<any> = [];

  constructor(private draftService: DraftService) { }

  ngOnInit() {
    const t = this.draftService.getData();
    t.snapshotChanges().subscribe(item => {
      this.teamList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.teamList.push(y as Team);
      });

      console.log(this.teamList);
      for (let i = 0; i < this.teamList.length; i++) {
        this.teams[this.teamList[i].$key] = [];

        for (let j = 0; j < this.teamList.length; j++) {
          if (this.teamList[i].player[j] === undefined) {
            break;
          }
          this.teams[this.teamList[i].$key].push(this.teamList[i].player[j]);
        }
      }
      console.log(this.teams);
    });
  }
}
