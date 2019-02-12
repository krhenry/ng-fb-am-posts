import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ScheduleService } from '../services/schedule.service';
import { Schedule } from '../models/schedule.model';
import { MatTableDataSource } from '@angular/material';
import { Captain } from '../models/captain.model';
import { CaptainService } from '../services/captain.service';
import { GameComponent } from '../game/game.component';
import { TeamService } from '../services/team.service';
import { Team } from '../models/team.model';

export interface GAME {
  name: string;
  points: number;
  threes: number;
  assists: number;
  rebounds: number;
  blocks: number;
  steals: number;
  fouls: number;
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  @ViewChild(GameComponent) teamsChild: GameComponent;

  parentMessage: string;
  statClick = false;
  home: string;
  away: string;

  selectedClan: string;

  schedule = new Schedule();
  gameList: Schedule[];
  captainList: Captain[];
  clanList: any = [];

  homeList: any = [];
  awayList: any = [];

  pageLoaded = false;

  displayedColumns: string[] = ['date', 'time', 'home', 'away', 'actions', 'winner', 'score'];
  dataSource = new MatTableDataSource;

  constructor(private scheduleService: ScheduleService, private captainService: CaptainService,
    private teamService: TeamService) { }

  ngOnInit() {
    const x = this.scheduleService.getData();
    const c = this.captainService.getData();
    x.snapshotChanges().subscribe(item => {
      this.gameList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.gameList.push(y as Schedule);
      });
      c.snapshotChanges().subscribe(it => {
        this.captainList = [];
        it.forEach(element => {
          const y = element.payload.toJSON();
          y['$key'] = element.key;
          this.captainList.push(y as Captain);
        });
        if (this.clanList.length === 0 ) {
          for (let i = 0; i < this.captainList.length; i++) {
            this.clanList.push(this.captainList[i].clan);
          }
        }
      });
      this.dataSource = new MatTableDataSource(this.gameList);
      this.pageLoaded = true;
    });
  }

  onDelete(key: string) {
    if (confirm('Are you sure to delete this game ?') === true) {
      this.scheduleService.deleteGame(key);
      // this.tostr.warning('Deleted Successfully', 'Question submit');
    }
  }

  onGame(home, away) {
    this.parentMessage = 'parent message test';
    this.statClick = true;
    this.home = home;
    this.away = away;

    this.teamsChild.gameDayParent(this.home, this.away);
    this.home = '';
    this.away = '';
  }

  onSubmit(scheduleForm: NgForm ) {
    const date = scheduleForm.value.date.toDateString();

    const h = this.teamService.getHomeTeam(scheduleForm.value.home);
    const a = this.teamService.getAwayTeam(scheduleForm.value.away);
    h.snapshotChanges().subscribe(item => {
      this.homeList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.homeList.push(y as Team);
      });
      a.snapshotChanges().subscribe(item => {
        this.awayList = [];
        item.forEach(element => {
          const y = element.payload.toJSON();
          y['$key'] = element.key;
          this.awayList.push(y as Team);
        });
        const newHome = [];
        const newAway = [];

        console.log(this.homeList);

        for (let i = 0; i < Object.keys(this.homeList[0]).length - 1; i++ ) {
          // newHome.push(this.homeList[0][i]);
          newHome.push({
            name: this.homeList[0][i],
            points: 0,
            threes: 0,
            assists: 0,
            rebounds: 0,
            blocks: 0,
            steals: 0,
            fouls: 0
          });
        }

        for (let i = 0; i < Object.keys(this.awayList[0]).length - 1; i++ ) {
          // newAway.push(this.awayList[0][i]);
          newAway.push({
            name: this.awayList[0][i],
            points: 0,
            threes: 0,
            assists: 0,
            rebounds: 0,
            blocks: 0,
            steals: 0,
            fouls: 0
          });
        }

        if (scheduleForm.valid === true) {
          if (scheduleForm.value.$key == null) {
            // this.scheduleService.insertGameTest(scheduleForm.value, date, newHome, newAway);
            this.scheduleService.insertGameTest(scheduleForm.value, date, newHome, newAway);
            // newHome.push(stat);
            console.log(newHome);
            console.log(newAway);


            // this.scheduleService.insertGame(scheduleForm.value, date);
            // this.scheduleService.insertGameTest(scheduleForm.value, date);
          }
          scheduleForm.resetForm();
        }
      });
    });
  }
}
