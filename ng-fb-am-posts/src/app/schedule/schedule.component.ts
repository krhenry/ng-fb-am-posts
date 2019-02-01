import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ScheduleService } from '../services/schedule.service';
import { Schedule } from '../models/schedule.model';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  schedule = new Schedule();
  gameList: Schedule[];

  pageLoaded = false;

  displayedColumns: string[] = ['date', 'time', 'home', 'away', 'actions'];
  dataSource = new MatTableDataSource;

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit() {
    const x = this.scheduleService.getData();
    x.snapshotChanges().subscribe(item => {
      this.gameList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.gameList.push(y as Schedule);
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
