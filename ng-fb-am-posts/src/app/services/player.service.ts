import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Player } from '../models/player.model';

@Injectable()
export class PlayerService {
  playerList: AngularFireList<any>;
  selectedPlayer: Player = new Player();

  constructor(private firebase: AngularFireDatabase ) { }

  getData() {
    // this.playerList = this.firebase.list('employees');
    this.playerList = this.firebase.list('players');
    return this.playerList;
  }

  insertPlayer(player: Player) {
    this.playerList.push({
      name: player.name,
      number1: player.number1,
      number2: player.number2,
      size: player.size,
      phone: player.phone
    });
  }

  updatePlayer(player: Player) {
    this.playerList.update(player.$key,
      {
        name: player.name,
        number1: player.number1,
        number2: player.number2,
        size: player.size,
        phone: player.phone
      });
  }

  deletePlayer($key: string) {
    this.playerList.remove($key);
  }

}
