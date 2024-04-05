export interface gameRoom {
  id: number;
  roomName: string;
  maxPlayers: number;
  rounds: number;
  description?: string;
  chatId: number;
  roundTime: number;
  isBegin: boolean;
  createdAt: Date;
  currentPlayers: number;
}
