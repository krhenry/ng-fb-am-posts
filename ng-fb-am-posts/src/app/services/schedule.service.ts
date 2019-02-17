import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Schedule } from '../models/schedule.model';

@Injectable()
export class ScheduleService {
  ScheduleList: AngularFireList<any>;
  selectedSchedule: Schedule = new Schedule();

  constructor(private firebase: AngularFireDatabase ) { }

  getData() {
    this.ScheduleList = this.firebase.list('schedule', ref => {
      return ref.orderByChild('date');
    });
    return this.ScheduleList;
  }

  getGameKey(key) {
    this.ScheduleList = this.firebase.list('schedule/' + key);
    return this.ScheduleList;
  }

  getGame(date, home, away) {
    date = date.split(' ').join('_');
    this.ScheduleList = this.firebase.list('schedule/' + date + '_' + home + '_' + away + '/a');
    return this.ScheduleList;
  }

  getHomeStats(date, home, away) {
    date = date.split(' ').join('_');
    this.ScheduleList = this.firebase.list('schedule/' + date + '_' + home + '_' + away + '/h');
    return this.ScheduleList;
  }

  getAwayStats(date, home, away) {
    date = date.split(' ').join('_');
    this.ScheduleList = this.firebase.list('schedule/' + date + '_' + home + '_' + away + '/a');
    return this.ScheduleList;
  }

  insertGame(schedule: Schedule, date) {
    date = date.split(' ').join('_');
    this.ScheduleList.push({
      date: date,
      time: schedule.time,
      home: schedule.home,
      away: schedule.away,
      winner: '',
      score: ''
    });
  }

  insertGameSet(schedule: Schedule, date, home, away) {
    const sched = this.firebase.database.ref('schedule/' + date.split(' ').join('_') + '_' + schedule.home + '_' + schedule.away);
    sched.set({
      date: date,
      time: schedule.time,
      home: schedule.home,
      away: schedule.away,
      winner: '',
      score: '',
      h: home,
      a: away
    });
  }

  updateGame(schedule: Schedule) {
    this.ScheduleList.update(schedule.$key,
    {
      date: schedule.date,
      time: schedule.time,
      home: schedule.home,
      away: schedule.away,
      winner: schedule.winner,
      score: schedule.score
    });
  }

  updateGameStat(i, date, home, away, stats, letter) {
    const key = '/';

    const sched = this.firebase.database.ref('schedule/' + date.split(' ').join('_') + '_' +
    home + '_' + away + '/' + letter + '/' + i + '/');

    sched.set({
      assists: stats.assists,
      blocks: stats.blocks,
      threes: stats.threes,
      ftm: stats.ftm,
      fta: stats.fta,
      ftp: (stats.ftm / stats.fta) * 100,
      points: stats.points,
      rebounds: stats.rebounds,
      fouls: stats.fouls,
      steals: stats.steals,
      name: stats.name
    });
  }

  deleteGame($key: string) {
    this.ScheduleList.remove($key);
  }

}
