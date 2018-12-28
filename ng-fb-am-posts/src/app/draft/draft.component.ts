import { Component, OnInit, Injectable } from '@angular/core';
import { Player } from '../models/player.model';
import { NgForm } from '@angular/forms';
import { PlayerService } from '../services/player.service';

@Injectable()
@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css']
})
export class DraftComponent implements OnInit {

  player = new Player();
  playerList: Player[];
  captainList: any = [];

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

  captainSelection(i, player) {
    this.playerList.splice(i, 1);
    this.captainList.push(player);
  }

}
