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
      // console.log(this.teamList);
      // console.log(Object.getOwnPropertyNames(this.teamList[0]).length);
      // console.log(this.teamList[0].$key);

      // for (const k in this.teamList[0]) {
      //   if (this.teamList[0].hasOwnProperty(k)) {
      //     // alert('Key is ' + k + ', value is' + this.teamList[0][k]);
      //     // console.log(k, this.teamList[0][k]);
      //     for (const i in this.teamList[0][k]) {
      //       console.log(i, this.teamList[0][k][i]);
      //     }
      //   }
      // }

      for (let i = 0; i < this.teamList.length; i++) {
        for (const k in this.teamList[i]) {
          if (this.teamList[i].hasOwnProperty(k)) {
            // alert('Key is ' + k + ', value is' + this.teamList[0][k]);
            // console.log(k, this.teamList[0][k]);
            for (const j in this.teamList[i][k]) {
              console.log(this.teamList[i].$key, this.teamList[i][k][j]);
              // this.teams[this.teamList[i].$key] = [];
              // this.teams[this.teamList[i].$key].push(this.teamList[i][k][j]);
            }
          }
        }
      }
      console.log(this.teams);


      // for (const c in this.teamList[0]) {
      //   console.log(c);
      // }
      // for (let i = 0; i < this.teamList.length; i++) {
      //   console.log(this.teamList[i]);
      // }
    });
    // console.log(this.teamList);
  }

}
