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

  insertGame(schedule: Schedule, date) {
    this.ScheduleList.push({
      date: date,
      time: schedule.time,
      home: schedule.home,
      away: schedule.away
    });
  }

  updateGame(schedule: Schedule) {
    this.ScheduleList.update(schedule.$key,
    {
      date: schedule.date,
      time: schedule.time,
      home: schedule.home,
      away: schedule.away
    });
  }

  deleteGame($key: string) {
    this.ScheduleList.remove($key);
  }

}
