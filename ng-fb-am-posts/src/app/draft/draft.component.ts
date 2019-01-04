import { Component, OnInit, Injectable, Pipe, PipeTransform } from '@angular/core';
import { Player } from '../models/player.model';
import { NgForm } from '@angular/forms';
import { PlayerService } from '../services/player.service';
import { orderBy } from 'lodash';

@Pipe({name: 'sort'})
export class ArraySortPipe implements PipeTransform {
  transform(array: any, field: string): any[] {
    if (!Array.isArray(array)) {
      return;
    }
    array.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}

// export class ArraySortPipe implements PipeTransform {

//  transform(input: any, args: string[]): any {
//    // transform input somehow
//    return input;
//  }
// }

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

  sortedList: any = [];

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
      console.log(this.playerList);
    });
  }


  captainSelection(i, player) {
    this.playerList.splice(i, 1);
    this.captainList.push(player);
  }

}
