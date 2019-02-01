import { Team } from './team.model';

export class Schedule {
  $key: string;
  date: Date;
  time: string;
  home: string;
  away: string;
}
