import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Captain } from '../models/captain.model';
import { CaptainService } from '../services/captain.service';
import { PlayerService } from '../services/player.service';
import { Player } from '../models/player.model';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-captain',
  templateUrl: './captain.component.html',
  styleUrls: ['./captain.component.css']
})
export class CaptainComponent implements OnInit {

  captain = new Captain();
  captainList: Captain[];

  player = new Player();
  playerList: Player[];

  selectedCaptainList: Array<any> = [];
  finalCaptainCount: [];

  clanss: string[] = ['Bears', 'Wolves', 'Snipes', 'Turtles', 'Deer', 'Beaver', 'Eel'];

  displayedColumns: string[] = ['select', 'name', 'phone'];
  dataSource = new MatTableDataSource;
  selection = new SelectionModel<any>(true, []);

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
    this.selectedIcon = event.value.icon;
  }

  constructor(private captainService: CaptainService, private playerService: PlayerService) { }

  ngOnInit() {
    const c = this.captainService.getData();
    const p = this.playerService.getData();
    c.snapshotChanges().subscribe(item => {
      this.captainList = [];
      item.forEach(element => {
        const a = element.payload.toJSON();
        a['$key'] = element.key;
        this.captainList.push(a as Captain);
      });
    });
    p.snapshotChanges().subscribe(item => {
      this.playerList = [];
      item.forEach(element => {
        const b = element.payload.toJSON();
        b['$key'] = element.key;
        this.playerList.push(b as Player);
      });
      this.dataSource = new MatTableDataSource(this.playerList);
    });
  }

  isSelected(player) {
    this.selectedCaptainList.push(player.name);
  }

  onSubmit(captainForm: NgForm) {
    if (captainForm.valid === true) {
      if (captainForm.value.$key == null) {
        this.captainService.insertCaptain(captainForm.value);
      }
      captainForm.resetForm();
    }
  }

  captainConfirm() {
    let i = 0;

    if (confirm('Are you sure to add these players as captains? ?' + this.selectedCaptainList) === true) {
      // this.captainService.insertCaptain(key);
      // this.tostr.warning('Deleted Successfully', 'Question submit');
      for (i; i < this.selectedCaptainList.length; i++) {
        this.captainService.insertCaptain(this.selectedCaptainList[i]);
      }
    }
  }

}
