import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './post/post.component';
import { PlayersComponent } from './players/players.component';
import { DraftComponent } from './draft/draft.component';

const routes: Routes = [
  { path: 'post', component: PostComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'draft', component: DraftComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
