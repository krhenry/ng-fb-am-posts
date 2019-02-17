import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { DraftService } from '../services/draft.service';
import { Team } from '../models/team.model';
import { TeamService } from '../services/team.service';
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  @Input() childMessage: string;
  @Input() statClick: boolean;
  @Input() key: string;
  @Input() date: string;
  @Input() home: string;
  @Input() away: string;

  @ViewChild('pts') ptsFields: ElementRef;

  teamHomeList: any = [];
  teamAwayList: any = [];

  homeTeam: any = [];
  awayTeam: any = [];

  homeStats: any;
  awayStats: any;

  dateString: string;
  homeString: string;
  awayString: string;

  // displayedColumns = ['position', 'name', 'points', 'threes', 'ftm', 'fta', 'assists', 'rebounds', 'blocks', 'steals', 'fouls'];

  displayedColumnsTest = ['position'];
  dataSourceTest = new MatTableDataSource(this.homeTeam);

  // home datasource table
  displayedColumnsHome: string[] = ['position', 'name', 'points', 'threes', 'ftm', 'fta',
  'assists', 'rebounds', 'blocks', 'steals', 'fouls'];
  dataSourceHome = new MatTableDataSource;

  // away datasource table
  displayedColumnsAway: string[] = ['position', 'name', 'points', 'threes', 'ftm', 'fta',
   'assists', 'rebounds', 'blocks', 'steals', 'fouls'];
  dataSourceAway = new MatTableDataSource;

  constructor(private teamService: TeamService, private scheduleService: ScheduleService) {
  }

  gameDayParent(key, date, home, away) {
    this.homeTeam = [];
    this.awayTeam = [];

    this.dateString = date;
    this.homeString = home;
    this.awayString = away;

    const h = this.scheduleService.getHomeStats(date, home, away);
    const a = this.scheduleService.getAwayStats(date, home, away);
    h.snapshotChanges().subscribe(item => {
      this.homeStats = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.homeStats.push(y as any);
      });
      a.snapshotChanges().subscribe(item => {
        this.awayStats = [];
        item.forEach(element => {
          const y = element.payload.toJSON();
          y['$key'] = element.key;
          this.awayStats.push(y as any);
        });
        this.dataSourceAway = new MatTableDataSource(this.awayStats);
      });
      this.dataSourceHome = new MatTableDataSource(this.homeStats);
    });
  }

  statInput(idx, stats, type, team) {
    if (team === 'home') {
      this.scheduleService.updateGameStat(idx, this.dateString, this.homeString, this.awayString, stats, 'h');
    } else if (team === 'away') {
      this.scheduleService.updateGameStat(idx, this.dateString, this.homeString, this.awayString, stats, 'a');
    }
    this.ptsFields.nativeElement.blur();
  }
}
