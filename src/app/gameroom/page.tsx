"use client";
import { useState } from "react";
import GameRoomList from "./_components/GameRoomList";
import { type gameRoom } from "./interfaces";
import CardWrapper from "./_components/GameWrapper";
import RightSideCreateGame from "./_components/RightSideCreateGame";
import GameRoomDetails from "./_components/GameRoomDatails";
import { api } from "@ktm/trpc/react";

export default function Page() {
  const [searchString, setSearchString] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<gameRoom | null>(null);
  const allRooms = api.gameRoom.getGameRoomsByFilter.useQuery({
    searchQuery: searchString,
  });
  return (

    <div className="bg-bgImage flex h-screen min-h-fit items-center justify-center p-4">
      <CardWrapper
        leftside={
          <GameRoomList
            setSearchString={setSearchString}
            selectedroom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
            allRooms={allRooms.data as unknown as gameRoom[]}
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
