"use client";
import { useState } from "react";
import GameRoomList from "./_components/GameRoomList";
import { type gameRoom } from "./interfaces";
import CardWrapper from "./_components/GameWrapper";
import RightSideCreateGame from "./_components/RightSideCreateGame";
import GameRoomDetails from "./_components/GameRoomDetails";
import LogoutButton from "../_components/LogoutButton";

export default function Page() {
  const [selectedRoom, setSelectedRoom] = useState<gameRoom | null>(null);
  return (
    <div className="flex h-screen min-h-fit items-center justify-center bg-bgImage p-4">
      <CardWrapper
        leftside={
          <GameRoomList
            // setSearchString={setSearchString}
            selectedroom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
            // allGameRoom={data}
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
      <LogoutButton />
    </div>
  );
}
