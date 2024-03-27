"use client";
import { useEffect, useState } from "react";
import GameRoomList from "../_components/GameRoomList";
import { type player, type gameRoom } from "../interfaces";
import ChatWrapper from "./_components/ChatWrapper";
import LeftSideRoomList from "./_components/LeftSideRoomList";
import RightSideCreateGame from "./_components/RightSideCreateGame";

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

const room1: gameRoom = {
  name: "This is room1 name",
  status: 3,
  maxRound: 5,
  players: [p1, p2],
  maxPlayer: 10,
  details: "for thai people",
};

const room2: gameRoom = {
  name: "This is room2 name long long long long long long long long",
  status: 0,
  maxRound: 7,
  players: [p3],
  maxPlayer: 4,
  details: "for thai people",
};

export default function Page() {
  const [selectedRoom, setSelectedRoom] = useState<gameRoom | null>(null);
  useEffect(() => {
    console.log(selectedRoom);
  }, [selectedRoom]);
  return (
    <div className="flex min-h-screen items-center justify-center">
      <ChatWrapper
        leftside={
          <GameRoomList
            setSelectedRoom={setSelectedRoom}
            allRooms={[room1, room2]}
          />
        }
        rightside={<RightSideCreateGame />}
      ></ChatWrapper>
    </div>
  );
}
