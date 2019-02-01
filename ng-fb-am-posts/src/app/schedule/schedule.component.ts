import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ScheduleService } from '../services/schedule.service';
import { Schedule } from '../models/schedule.model';
import { MatTableDataSource } from '@angular/material';
import { Captain } from '../models/captain.model';
import { CaptainService } from '../services/captain.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  selectedClan: string;

  schedule = new Schedule();
  gameList: Schedule[];
  captainList: Captain[];
  clanList: any = [];

  pageLoaded = false;

  displayedColumns: string[] = ['date', 'time', 'home', 'away', 'actions', 'winner', 'score'];
  dataSource = new MatTableDataSource;

  constructor(private scheduleService: ScheduleService, private captainService: CaptainService) { }

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

  onSubmit(scheduleForm: NgForm ) {
    const date = scheduleForm.value.date.toDateString();
    // console.log(scheduleForm.value.date.toString());
    console.log(scheduleForm.value.date.toDateString());
    console.log(scheduleForm);
    if (scheduleForm.valid === true) {
      if (scheduleForm.value.$key == null) {
        this.scheduleService.insertGame(scheduleForm.value, date);
      }
      scheduleForm.resetForm();
    }
  }

}
