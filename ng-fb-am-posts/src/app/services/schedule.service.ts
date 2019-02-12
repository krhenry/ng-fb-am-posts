import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Schedule } from '../models/schedule.model';

@Injectable()
export class ScheduleService {
  ScheduleList: AngularFireList<any>;
  selectedSchedule: Schedule = new Schedule();

  constructor(private firebase: AngularFireDatabase ) { }

  getData() {
    // this.playerList = this.firebase.list('employees');
    this.ScheduleList = this.firebase.list('schedule');
    return this.ScheduleList;
  }

  getGame(date, home, away) {
    this.ScheduleList = this.firebase.list('schedule/' + date + '_' + home + '_' + away);
    return this.ScheduleList;
  }

  insertGame(schedule: Schedule, date) {
    this.ScheduleList.push({
      date: date,
      time: schedule.time,
      home: schedule.home,
      away: schedule.away,
      winner: '',
      score: ''
    });
  }

  insertGameTest(schedule: Schedule, date, home, away) {
    console.log('inserttest', name);
    this.ScheduleList.push({
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

  insertGameSet(schedule: Schedule, date, home, away) {
    const sched = this.firebase.database.ref('schedule/' + date + '_' + schedule.home + '_' + schedule.away);
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

  deleteGame($key: string) {
    this.ScheduleList.remove($key);
  }

}
