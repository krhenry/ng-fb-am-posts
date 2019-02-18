import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Captain } from '../models/captain.model';


@Injectable()
export class CaptainService {
  CaptainList: AngularFireList<any>;
  selectedCaptain: Captain = new Captain();

  constructor(private firebase: AngularFireDatabase ) { }

  getData() {
    this.CaptainList = this.firebase.list('captains');
    return this.CaptainList;
  }

  insertCaptain(captain: Captain) {
    this.CaptainList.push({
      name: captain,
      clan: '',
      imageURL: ''

      // color1: captain.color1,
      // color2: captain.color2
    });
  }

  // updateCaptain(captain: Captain, clan) {
  //   console.log(captain, clan);
  //   this.CaptainList.update(captain.$key,
  //     {
  //       name: captain.name,
  //       clan: clan,
  //       // color1: captain.color1,
  //       // color2: captain.color2
  //     });
  // }

  updateCaptain(key, clan) {
    console.log(key, clan);
    this.CaptainList.update(key,
    {
      clan: clan.value,
      imageURL: clan.imageURL
      // color1: captain.color1,
      // color2: captain.color2
    });
  }

  deleteCaptain($key: string) {
    this.CaptainList.remove($key);
  }

  deleteAllCaptains() {
    this.CaptainList.remove();
  }

}
