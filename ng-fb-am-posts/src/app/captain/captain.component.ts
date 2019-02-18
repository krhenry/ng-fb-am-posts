import { Component, OnInit, Input, Pipe, PipeTransform } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Captain } from '../models/captain.model';
import { CaptainService } from '../services/captain.service';
import { PlayerService } from '../services/player.service';
import { Player } from '../models/player.model';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { element } from '@angular/core/src/render3';
import { orderBy } from 'lodash';

export interface Clan {
  value: string;
  imageURL: string;
}

@Component({
  selector: 'app-captain',
  templateUrl: './captain.component.html',
  styleUrls: ['./captain.component.css']
})
export class CaptainComponent implements OnInit {

  captainsSelected: boolean;

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
  clans: Clan[] = [
    { value: 'Bears' , imageURL: '' },
    { value: 'Wolves' , imageURL: '' },
    { value: 'Snipes' , imageURL: '' },
    { value: 'Turtles' , imageURL: '' },
    { value: 'Deer' , imageURL: '' },
    { value: 'Beaver' , imageURL: 'https://cdn.pixabay.com/photo/2013/07/12/13/27/beaver-147073__340.png' },
    { value: 'Eel' , imageURL: '' }
  ];

  optionSelected(event) {
    this.selectedIcon = event.value.icon;
  }

  // clanSelected(captain, clan) {
  //   this.captainService.updateCaptain(captain.$key, clan);
  // }

  constructor(private captainService: CaptainService, private playerService: PlayerService) { }

  ngOnInit() {
    // note: add clan to captain instead of manually doing it.

    const c = this.captainService.getData();
    const p = this.playerService.getData();
    c.snapshotChanges().subscribe(item => {
      this.captainList = [];
      item.forEach(element => {
        const a = element.payload.toJSON();
        a['$key'] = element.key;
        this.captainList.push(a as Captain);
      });
      if (this.captainList.length > 0) {
        this.captainsSelected = true;
      } else {
        this.captainsSelected = false;
      }
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
      this.captainsSelected = true;
    }
  }

  onClanSubmit(clanForm: NgForm, captain) {
    // console.log(clanForm.value);
    // console.log(clanForm.value.clan);
    // console.log(captain.$key, captain.name, captain.clan);
    this.captainService.updateCaptain(captain.$key, clanForm.value.clan);
  }

  resetCaptains() {
    if (confirm('Are you sure to reset the captains? ' + this.selectedCaptainList) === true) {
      // this.captainService.insertCaptain(key);
      // this.tostr.warning('Deleted Successfully', 'Question submit');
      this.captainsSelected = false;
      this.captainService.deleteAllCaptains();
    }
  }

}
