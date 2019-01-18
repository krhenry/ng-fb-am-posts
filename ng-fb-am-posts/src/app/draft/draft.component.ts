import { Component, OnInit, Injectable, Pipe, PipeTransform } from '@angular/core';
import { Player } from '../models/player.model';
import { NgForm } from '@angular/forms';
import { PlayerService } from '../services/player.service';
import { orderBy } from 'lodash';
import { Captain } from '../models/captain.model';
import { CaptainService } from '../services/captain.service';

@Pipe({name: 'sort'})
export class ArraySortPipe implements PipeTransform {
  transform(array: any, field: string): any[] {
    if (!Array.isArray(array)) {
      return;
    }

    array.sort((a: any, b: any) => {
      if (a[field] > b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 0;
      } else {
        return 1;
      }
    });
    return array;
  }
}

@Injectable()
@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css']
})

export class DraftComponent implements OnInit {

  player = new Player();
  playerList: Player[];
  // captainList: any = [];
  captainList: Captain[];

  draftRoundsDisplay: Number; // Displays how many rounds there are
  round = 1; // Shows initial round. Increases after x amount of players choosen (based on captain count)

  sortedList: any = [];

  availableList: any = [];

  availableListLoaded: Boolean = false; // playerList needs to be loaded first before using sort to show correct list (without captains)
  availPlayerCount = 0;

  teams: Array<any> = [];

  constructor(private playerService: PlayerService, private captainService: CaptainService) { }

  ngOnInit() {
    const x = this.playerService.getData();
    const c = this.captainService.getData();
    x.snapshotChanges().subscribe(item => {
      this.playerList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.playerList.push(y as Player);
      });
      c.snapshotChanges().subscribe(it => {
        this.captainList = [];
        it.forEach(element => {
          const y = element.payload.toJSON();
          y['$key'] = element.key;
          this.captainList.push(y as Captain);
        });
        this.createTeamArr();
        for (let i = 0; i < this.playerList.length; i++) {
          for (let j = 0; j < this.captainList.length; j++) {
            // console.log(this.captainList[j].clan);
            if (this.playerList[i].name === this.captainList[j].name) {
              this.playerList.splice(i, 1);
            }
          }
        }
        this.availableListLoaded = true;
        this.draftRoundsDisplay = Math.ceil(this.playerList.length / this.captainList.length);
        console.log(this.captainList);
        // this.createTeamArr();
      });
    });
  }

  createTeamArr() {
    for (let i = 0; i < this.captainList.length; i++) {
      this.teams[this.captainList[i].clan] = [];
      this.teams[this.captainList[i].clan].push(this.captainList[i].name);
      // console.log(this.teams[this.captainList[i].clan], this.captainList[i].clan);
      // if (this.captainList[i].clan === this.teams[this.captainList[i].clan]) {
      //   this.teams[this.captainList[i].clan].push(this.captainList[i].name);
      // }
    }
    console.log(this.teams);

  }


  playerSelection(i, player) {
    this.availPlayerCount += 1;
    this.playerList.splice(i, 1);
    // this.captainList.push(player);
    if (this.availPlayerCount % this.captainList.length ===  0) {
      this.round += 1;
    }
  }

}
