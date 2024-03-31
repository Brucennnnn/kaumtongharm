export interface player {
  name: string;
  score: number;
  myWord: string | null;
}

export interface gameRoom {
  id: number;
  gameTitle: string;
  maxPlayers: number;
  rounds: number;
  description: string;
  chatId: number;
  roundTime: number;
  isBegin: boolean;
  createdAt: Date;

  players: player[];
}
