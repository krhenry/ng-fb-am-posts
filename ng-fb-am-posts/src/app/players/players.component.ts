import { Component, OnInit, Injectable } from '@angular/core';
import { Player } from '../models/player.model';
import { NgForm } from '@angular/forms';
import { PlayerService } from '../services/player.service';

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

  player = new Player();
  playerList: Player[];

  sizes: Size[] = [
    { value: 'medium', valueView: 'M' },
    { value: 'large', valueView: 'L' },
    { value: 'x-large', valueView: 'XL' },
    { value: 'xx-large', valueView: 'XXL' },
    { value: 'xxx-large', valueView: 'XXXL' }
  ];

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

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
    });
  }

  onDelete(key: string) {
    if (confirm('Are you sure to delete this question ?') === true) {
      this.playerService.deletePlayer(key);
      // this.tostr.warning('Deleted Successfully', 'Question submit');
    }
  }

  onSubmit(playerForm: NgForm) {
    if (playerForm.valid === true) {
      if (playerForm.value.$key == null) {
        this.playerService.insertPlayer(playerForm.value);
      }
      // alert('Thanks for submitting! Data: ' + JSON.stringify(this.player));
      playerForm.resetForm();
    }
  }

}
