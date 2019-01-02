import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Captain } from '../models/captain.model';
import { CaptainService } from '../services/captain.service';

@Component({
  selector: 'app-captain',
  templateUrl: './captain.component.html',
  styleUrls: ['./captain.component.css']
})
export class CaptainComponent implements OnInit {

  captain = new Captain();
  captainList: Captain[];

  clanss: string[] = ['Bears', 'Wolves', 'Snipes', 'Turtles', 'Deer', 'Beaver', 'Eel'];

  selectedClan: string;
  selectedIcon;
  clans = [
    { value: 'Bears' , viewValue: 'Bears', icon: "http://lorempixel.com/40/40/transport/" },
    { value: 'Wolves' , viewValue: 'Wolves', icon: "http://lorempixel.com/40/40/transport/" },
    { value: 'Snipes' , viewValue: 'Snipes', icon: "http://lorempixel.com/40/40/transport/" },
    { value: 'Turtles' , viewValue: 'Turtles', icon: "http://lorempixel.com/40/40/transport/" },
    { value: 'Deer' , viewValue: 'Deer', icon: '../../assets/img/deer.jpg' },
    { value: 'Beaver' , viewValue: 'Beaver', icon: "http://lorempixel.com/40/40/transport/" },
    { value: 'Eel' , viewValue: 'Eel', icon: "http://lorempixel.com/40/40/transport/" },
  ];

  optionSelected(event) {
    // console.log(event.value.icon);
    this.selectedIcon = event.value.icon;
  }

  constructor(private captainService: CaptainService) { }

  ngOnInit() {
  }

  onSubmit(captainForm: NgForm) {
    if (captainForm.valid === true) {
      if (captainForm.value.$key == null) {
        this.captainService.insertCaptain(captainForm.value);
      }
      // alert('Thanks for submitting! Data: ' + JSON.stringify(this.player));
      captainForm.resetForm();
    }
  }

}

// selectedBodystyle: string;
//   selectedIcon;
//   bodyStyles = [
//     { value: 'Mercedez' , viewValue: 'Mercedez', icon: "http://lorempixel.com/40/40/transport/" },
//     { value: 'Ferrari'  , viewValue: 'Ferrari' , icon: "http://lorempixel.com/30/30/transport/" },
//     { value: 'BMW'      , viewValue: 'BMW'     , icon: "http://lorempixel.com/50/50/transport/" }
//   ];

//   optionSelected(event){
//     // console.log(event.value.icon);
//     this.selectedIcon = event.value.icon;
//   }
