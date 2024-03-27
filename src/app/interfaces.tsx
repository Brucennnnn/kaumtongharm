export interface player {
  name: string;
  score: number;
  myWord: string | null;
}

export interface gameRoom {
  name: string;
  status: number; //round 1-?, 0: not started
  maxRound: number;
  players: player[];
  maxPlayer: number;
  details: string;
}