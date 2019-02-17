import { Component, OnInit } from '@angular/core';
import { PlayerService } from './services/player.service';
import { Player } from './models/player.model';
import { Captain } from './models/captain.model';
import { CaptainService } from './services/captain.service';
import { Team } from './models/team.model';
import { TeamService } from './services/team.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng-fb-am-posts';

  playerList: Player[];
  playersLoaded = false;

  captainList: Captain[];
  captainsLoaded = false;

  teamList: Team[];
  teamsLoaded = false;

  constructor(private playerService: PlayerService,
    private captainService: CaptainService,
    private teamService: TeamService) {}

  ngOnInit() {
    const p = this.playerService.getData();
    const c = this.captainService.getData();
    const t = this.teamService.getData();
    p.snapshotChanges().subscribe(item => {
      this.playerList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.playerList.push(y as Player);
      });
      if (this.playerList.length > 0) {
        this.playersLoaded = true;
      }
      c.snapshotChanges().subscribe(item => {
        this.captainList = [];
        item.forEach(element => {
          const y = element.payload.toJSON();
          y['$key'] = element.key;
          this.captainList.push(y as Captain);
        });
        if (this.captainList.length > 0) {
          this.captainsLoaded = true;
        }
        t.snapshotChanges().subscribe(item => {
          this.teamList = [];
          item.forEach(element => {
            const y = element.payload.toJSON();
            y['$key'] = element.key;
            this.teamList.push(y as Team);
          });
          if (this.teamList.length > 0) {
            this.teamsLoaded = true;
          }
        });
      });
    });
  }
}
