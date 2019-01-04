import { Component, OnInit, Injectable, ViewChild, ElementRef } from '@angular/core';
import { Player } from '../models/player.model';
import { NgForm } from '@angular/forms';
import { PlayerService } from '../services/player.service';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

export interface Size {
  value: string;
  valueView: string;
}

export interface Color {
  value: string;
  valueView: string;
}

@Injectable()
@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  @ViewChild('name') nameField: ElementRef;

  player = new Player();
  playerList: Player[];

  sizes: Size[] = [
    { value: 'Small', valueView: 'S' },
    { value: 'Medium', valueView: 'M' },
    { value: 'Large', valueView: 'L' },
    { value: 'X-Large', valueView: 'XL' },
    { value: 'XX-Large', valueView: 'XXL' },
    { value: 'XXX-Large', valueView: 'XXXL' },
    { value: 'XXXX-Large', valueView: 'XXXXL' }
  ];

  // displayedColumns: string[] = ['name', 'number1', 'number2', 'size', 'phone'];
  displayedColumns: string[] = ['name', 'stars', '#', 'alt #', 'size', 'phone', 'actions'];
  dataSource = new MatTableDataSource;
  selection = new SelectionModel<any>(true, []);

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    const x = this.playerService.getData();
    x.snapshotChanges().subscribe(item => {
      this.playerList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.playerList.push(y as Player);
      });
      this.dataSource = new MatTableDataSource(this.playerList);
    });
  }

  onDelete(key: string) {
    if (confirm('Are you sure to delete this player ?') === true) {
      this.playerService.deletePlayer(key);
      // this.tostr.warning('Deleted Successfully', 'Question submit');
    }
  }

  onSubmit(playerForm: NgForm) {
    if (playerForm.value.number2 === undefined) {
      playerForm.value.number2 = null;
    }
    if (playerForm.valid === true) {
      if (playerForm.value.$key == null) {
        this.playerService.insertPlayer(playerForm.value);
      }
      // alert('Thanks for submitting! Data: ' + JSON.stringify(this.player));
      this.nameField.nativeElement.focus();
      playerForm.resetForm();
    }
  }

}
