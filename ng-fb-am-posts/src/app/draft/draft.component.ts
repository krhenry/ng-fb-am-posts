import { Component, OnInit, Injectable, Pipe, PipeTransform } from '@angular/core';
import { Player } from '../models/player.model';
import { NgForm } from '@angular/forms';
import { PlayerService } from '../services/player.service';
import { orderBy } from 'lodash';
import { Captain } from '../models/captain.model';
import { CaptainService } from '../services/captain.service';
import { DraftService } from '../services/draft.service';
import { Team } from '../models/team.model';

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
  captainList: Captain[];
  teamList: Team[];

  draftRoundsDisplay: Number; // Displays how many rounds there are
  round = 1; // Shows initial round. Increases after x amount of players choosen (based on captain count)

  sortedList: any = [];

  availableList: any = [];

  availableListLoaded: Boolean = false; // playerList needs to be loaded first before using sort to show correct list (without captains)
  availPlayerCount = 0;

  teams: Array<any> = [];

  draftOrder: any = [];
  draftClick = 0;
  draftIndex = 0;

  startDraft = false;

  draftOrderFinalized = false;

  pageloaded = false;

  constructor(private playerService: PlayerService, private captainService: CaptainService,
    private draftService: DraftService) { }

  ngOnInit() {
    const t = this.draftService.getData();
    const x = this.playerService.getData();
    const c = this.captainService.getData();
    t.snapshotChanges().subscribe(item => {
      this.teamList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.teamList.push(y as Team);
      });
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
              if (this.playerList[i].name === this.captainList[j].name) {
                this.playerList.splice(i, 1);
              }
            }
          }
          this.pageloaded = true;
          this.availableListLoaded = true;
          this.draftRoundsDisplay = Math.ceil(this.playerList.length / this.captainList.length);
        });
      });
    });
  }

  createTeamArr() {
    for (let i = 0; i < this.captainList.length; i++) {
      this.teams[this.captainList[i].clan] = [];
      this.teams[this.captainList[i].clan].push(this.captainList[i].name);
    }
  }

  startDraftClick() {
    this.startDraft = false;
    this.draftOrderFinalized = true;
  }

  draftOrderClick(i, captain) {
    this.draftClick += 1;

    this.draftOrder.push({
      clan: captain.clan,
      name: captain.name
    });

    if (this.draftClick > 4) {
      this.startDraft = true;
    }
  }

  addTeam() {
    this.draftService.insertTeam('Bears', 'Jeff');
  }


  playerSelection(i, player) {
    this.availPlayerCount += 1;
    this.playerList.splice(i, 1);

    if (this.availPlayerCount % this.captainList.length ===  0) {
      this.round += 1;
    }

    // console.log(this.teams);
    // console.log(this.captainList);
    // console.log(this.teams);

    this.teams['' + this.draftOrder[this.draftIndex].clan + ''].push(player.name);

    this.draftIndex += 1;
  }

}
