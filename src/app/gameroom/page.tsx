"use client";
import { useEffect, useState } from "react";
import GameRoomList from "./_components/GameRoomList";
import { type player, type gameRoom } from "./interfaces";
import CardWrapper from "./_components/GameWrapper";
import RightSideCreateGame from "./_components/RightSideCreateGame";
import GameRoomDetails from "./_components/GameRoomDatails";

const p1: player = {
  name: "Nicepun",
  score: 0,
  myWord: null,
};

const p2: player = {
  name: "Bruce",
  score: 0,
  myWord: null,
};

const p3: player = {
  name: "Kim",
  score: 0,
  myWord: null,
};

const p4: player = {
  name: "Puun",
  score: 0,
  myWord: null,
};

const room1: gameRoom = {
  id: 1,
  gameTitle: "Room 1 name",
  maxPlayers: 10,
  rounds: 5,
  description: "description",
  chatId: 0,
  roundTime: 0,
  isBegin: false,
  createdAt: new Date(),
  players: [p1, p2],
};

const room2: gameRoom = {
  id: 2,
  gameTitle: "Room 2 name",
  maxPlayers: 5,
  rounds: 5,
  description: "description",
  chatId: 0,
  roundTime: 0,
  isBegin: false,
  createdAt: new Date(),
  players: [p1, p2, p3],
};

const room3: gameRoom = {
  id: 3,
  gameTitle: "Room 3 name",
  maxPlayers: 8,
  rounds: 5,
  description: "description",
  chatId: 0,
  roundTime: 0,
  isBegin: false,
  createdAt: new Date(),
  players: [p1, p2, p3, p4],
};

const room4: gameRoom = {
  id: 4,
  gameTitle: "Room 4 name",
  maxPlayers: 4,
  rounds: 5,
  description: "description",
  chatId: 0,
  roundTime: 0,
  isBegin: false,
  createdAt: new Date(),
  players: [p1],
};

const room5: gameRoom = {
  id: 5,
  gameTitle: "Room 5 name",
  maxPlayers: 10,
  rounds: 5,
  description: "description",
  chatId: 0,
  roundTime: 0,
  isBegin: false,
  createdAt: new Date(),
  players: [p1, p2],
};

const room6: gameRoom = {
  id: 6,
  gameTitle: "Room 6 name",
  maxPlayers: 10,
  rounds: 5,
  description: "description",
  chatId: 0,
  roundTime: 0,
  isBegin: false,
  createdAt: new Date(),
  players: [p1, p2],
};

const room7: gameRoom = {
  id: 7,
  gameTitle: "Room 7 name",
  maxPlayers: 10,
  rounds: 5,
  description:
    "description long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long",
  chatId: 0,
  roundTime: 0,
  isBegin: false,
  createdAt: new Date(),
  players: [p1, p2],
};

const room8: gameRoom = {
  id: 8,
  gameTitle:
    "Room 8 name long long long long long long long long long long long long long long long long",
  maxPlayers: 10,
  rounds: 5,
  description: "description",
  chatId: 0,
  roundTime: 0,
  isBegin: false,
  createdAt: new Date(),
  players: [p1, p2],
};

export default function Page() {
  const [selectedRoom, setSelectedRoom] = useState<gameRoom | null>(null);
  return (
    <div className="flex h-screen min-h-fit items-center justify-center p-4">
      <CardWrapper
        leftside={
          <GameRoomList
            selectedroom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
            allRooms={[room1, room2, room3, room4, room5, room6, room7, room8]}
          />
        }
        rightside={
          selectedRoom ? (
            <GameRoomDetails room={selectedRoom} />
          ) : (
            <RightSideCreateGame />
          )
        }
      />
    </div>
  );
}
