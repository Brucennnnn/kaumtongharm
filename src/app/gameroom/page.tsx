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
  _id: "s4dfaw2gv5bi14gry",
  name: "This is room1 name",
  status: 3,
  maxRound: 10,
  players: [p1, p2],
  maxPlayer: 10,
  details: "for thai people only ka",
};

const room2: gameRoom = {
  _id: "d0gbjmgub3grj94muh",
  name: "This is room2 name long long long long long long long long",
  status: 0,
  maxRound: 3,
  players: [p3],
  maxPlayer: 4,
  details: "for thai people",
};

const room3: gameRoom = {
  _id: "ufi4vnhrus7bhsg2sji",
  name: "This is room3 name",
  status: 2,
  maxRound: 7,
  players: [p1, p4, p3],
  maxPlayer: 5,
  details: "for thai people kab",
};
const room4: gameRoom = {
  _id: "grugmjtioibodj5ie4",
  name: "This is room4 name",
  status: 2,
  maxRound: 5,
  players: [p1, p2, p4, p3],
  maxPlayer: 4,
  details:
    "for thai people kab long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long",
};

const room5: gameRoom = {
  _id: "g80sakrhnjmkbdj5ie4",
  name: "This is room5 name",
  status: 2,
  maxRound: 5,
  players: [p1, p2, p4, p3],
  maxPlayer: 4,
  details:
    "for thai people kab long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long",
};

const room6: gameRoom = {
  _id: "g8klbjmg;ovih67yn1j5ie4",
  name: "This is room6 name",
  status: 0,
  maxRound: 5,
  players: [p1, p2, p4, p3],
  maxPlayer: 4,
  details:
    "for thai people kab long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long",
};

const room7: gameRoom = {
  _id: "g80sa2sgvir0bklf7evunr5ie4",
  name: "This is room7 name",
  status: 2,
  maxRound: 5,
  players: [p1, p2, p4, p3],
  maxPlayer: 4,
  details:
    "for thai people kab long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long",
};

const room8: gameRoom = {
  _id: "gshbnrot9ibrbh4estgvjn",
  name: "This is room8 name",
  status: 2,
  maxRound: 5,
  players: [p1, p2, p4, p3],
  maxPlayer: 4,
  details:
    "for thai people kab long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long",
};

const room9: gameRoom = {
  _id: "grojmg4gkbt0t0r5ie4",
  name: "This is room9 name",
  status: 2,
  maxRound: 5,
  players: [p1, p2, p4, p3],
  maxPlayer: 4,
  details:
    "for thai people kab long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long",
};

const room10: gameRoom = {
  _id: "gjkbnfkrhinj5ie4",
  name: "This is room10 name",
  status: 2,
  maxRound: 5,
  players: [p1, p2, p4, p3],
  maxPlayer: 4,
  details:
    "for thai people kab long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long",
};

const room11: gameRoom = {
  _id: "gekjbgoribjmrpbro5ie4",
  name: "This is room11 name",
  status: 2,
  maxRound: 5,
  players: [p1, p2, p4, p3],
  maxPlayer: 4,
  details: "for thai people kab long long long",
};

const room12: gameRoom = {
  _id: "gdfugovjteobunmo5ie4",
  name: "This is room12 name",
  status: 2,
  maxRound: 5,
  players: [p1, p2, p4, p3],
  maxPlayer: 4,
  details:
    "for thai people kab long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long",
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
            allRooms={[
              room1,
              room2,
              room3,
              room4,
              room5,
              room6,
              room7,
              room8,
              room9,
              room10,
              room11,
              room12,
            ]}
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
