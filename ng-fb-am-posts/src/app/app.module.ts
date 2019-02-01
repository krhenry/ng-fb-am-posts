import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

import { PostComponent } from './post/post.component';
import { MaterialModule } from './material.module';
import { PlayersComponent } from './players/players.component';
import { FormsModule } from '@angular/forms';
import { PlayerService } from './services/player.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { DraftComponent, ArraySortPipe } from './draft/draft.component';
import { CaptainComponent } from './captain/captain.component';
import { CaptainService } from './services/captain.service';
import { TeamsComponent } from './teams/teams.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleService } from './services/schedule.service';
import { StatsComponent } from './stats/stats.component';


@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PlayersComponent,
    DraftComponent,
    CaptainComponent,
    ArraySortPipe,
    TeamsComponent,
    ScheduleComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [PlayerService, CaptainService, ScheduleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
