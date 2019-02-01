import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ScheduleService } from '../services/schedule.service';
import { Schedule } from '../models/schedule.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  schedule = new Schedule();

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit() {
  }

  onSubmit(scheduleForm: NgForm ) {
    if (scheduleForm.value.number2 === undefined) {
      scheduleForm.value.number2 = null;
    }
    if (scheduleForm.valid === true) {
      if (scheduleForm.value.$key == null) {
        this.scheduleService.insertPlayer(scheduleForm.value);
      }
      // alert('Thanks for submitting! Data: ' + JSON.stringify(this.player));
      // this.nameField.nativeElement.focus();
      scheduleForm.resetForm();
    }
  }

}
