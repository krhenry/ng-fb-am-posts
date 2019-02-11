import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { DraftService } from '../services/draft.service';
import { Team } from '../models/team.model';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  @Input() childMessage: string;
  @Input() statClick: boolean;
  @Input() home: string;
  @Input() away: string;

  teamHomeList: any = [];
  teamAwayList: any = [];

  homeTeam: any = [];
  awayTeam: any = [];

  // displayedColumns = ['position', 'name', 'weight', 'symbol', 'fav'];
  displayedColumns = ['position', 'name', 'points', 'threes', 'assists', 'rebounds', 'blocks', 'steals', 'fouls']
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  ds = new MatTableDataSource(CDATA);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(private teamService: TeamService) {

    // console.log(this.home);
    // const x = this.teamService.getHomeTeam(this.home);
    // x.snapshotChanges().subscribe(item => {
    //   this.teamList = [];
    //   item.forEach(element => {
    //     const y = element.payload.toJSON();
    //     y['$key'] = element.key;
    //     this.teamList.push(y as Team);
    //   });
    //   console.log(this.teamList);
    //   // this.dataSource = new MatTableDataSource(this.playerList);
    //   // this.pageLoaded = true;
    // });
  }

  gameDayParent(home, away) {
    this.homeTeam = [];
    this.awayTeam = [];

    console.log(home, away);
    const h = this.teamService.getHomeTeam(home);
    const a = this.teamService.getAwayTeam(away);
    h.snapshotChanges().subscribe(item => {
      this.teamHomeList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.teamHomeList.push(y as Team);
      });
      a.snapshotChanges().subscribe(item => {
        this.teamAwayList = [];
        item.forEach(element => {
          const y = element.payload.toJSON();
          y['$key'] = element.key;
          this.teamAwayList.push(y as Team);
        });
        for (let i = 0; i < Object.keys(this.teamAwayList[0]).length - 1; i++) {
          this.awayTeam.push(this.teamAwayList[0][i]);
        }
        console.log(this.awayTeam);
      });

      for (let i = 0; i < Object.keys(this.teamHomeList[0]).length - 1; i++) {
        this.homeTeam.push(this.teamHomeList[0][i]);
      }

      console.log(this.homeTeam);
      // this.dataSource = new MatTableDataSource(this.playerList);
      // this.pageLoaded = true;
    });
  }
}




export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  fav: string;
}

export interface DATA {
  position: number;
  name: string;
  points: number;
  threes: number;
  assists: number;
  rebounds: number;
  blocks: number;
  steals: number;
  fouls: number;
}


const ELEMENT_DATA: Element[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', fav: "Yes" },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', fav: "" },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', fav: "" },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', fav: "" },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', fav: "Yes" },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', fav: "" },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', fav: "" }
];

// displayedColumns = ['position', 'name', 'points', 'assists', 'rebounds', 'blocks', 'steals', 'fouls']

const CDATA: DATA[] = [
  { position: 1, name: 'Kyle', points: 22, threes: 5, assists: 3, rebounds: 2, blocks: 2, steals: 2, fouls: 0 },
  { position: 2, name: 'Gaston', points: 11, threes: 0, assists: 2, rebounds: 0, blocks: 5, steals: 0, fouls: 2 },
  { position: 3, name: 'Hook', points: 1, threes: 0, assists: 1, rebounds: 0, blocks: 3, steals: 0, fouls: 3 },
  { position: 4, name: 'Pan', points: 18, threes: 2, assists: 4, rebounds: 6, blocks: 1, steals: 1, fouls: 0 },
  { position: 5, name: 'Tinker Bell', points: 2, threes: 0, assists: 5, rebounds: 4, blocks: 1, steals: 1, fouls: 0 },
  { position: 6, name: 'Hercules', points: 2, threes: 0, assists: 5, rebounds: 4, blocks: 1, steals: 1, fouls: 0 },
];
