import { Team } from './team.model';

export class Schedule {
  $key: string;
  date: string;
  time: string;
  home: string;
  away: string;
  winner: string;
  score: string;
}
