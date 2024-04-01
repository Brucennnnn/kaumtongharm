"use client";
import { type gameRoom } from "../interfaces";
import GameRoomBox from "./GameRoomBox";
import { type Dispatch, type SetStateAction } from "react";

import { Button } from "@ktm/components/ui/button";
import { Input } from "@ktm/components/ui/input";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type RouterOutputs } from "@ktm/trpc/react";

interface gameRoomListProps {
  setSearchString: Dispatch<SetStateAction<string>>;
  selectedroom: gameRoom | null;
  setSelectedRoom: Dispatch<SetStateAction<gameRoom | null>>;
  allGameRoom: allGameRoom;
}

type allGameRoom = NonNullable<
  RouterOutputs["gameRoom"]["getGameRoomsByFilter"]
>;

export default function GameRoomList(props: gameRoomListProps) {
  const { allGameRoom, setSelectedRoom, selectedroom, setSearchString } = props;
  return (
    <div className="flex w-full grow flex-col gap-3">
      <div className="flex w-full justify-end">
        <Button
          className="text-md rounded-md border-2 border-stroke bg-pending font-bold shadow-button"
          onClick={() => {
            setSelectedRoom(null);
          }}
        >
          Create Game
        </Button>
      </div>
      <div className="relative w-full">
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-3 top-2.5  self-center text-2xl text-stroke"
          width="16"
        />
        <Input
          placeholder="Search Room"
          className="text-md h-fit w-full rounded-md border-none bg-background py-2  pl-10 text-lg font-semibold text-stroke focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
        />
      </div>
      <div className="scroll flex w-full grow flex-col gap-y-3 rounded-lg bg-background p-3">
        {allGameRoom.map((item, index) => {
          return (
            <GameRoomBox
              key={item.id}
              room={
                {
                  id: item.id,
                  roomName: item.roomName,
                  maxPlayers: item.maxPlayers,
                  rounds: item.rounds,
                  description: item.description,
                  chatId: item.chat?.id,
                  roundTime: item.roundTime,
                  isBegin: item.isBegin,
                  createdAt: item.createdAt,
                  currentPlayers: item.chat?.User.length,
                } as gameRoom
              }
              selectedroom={selectedroom}
              setSelectedRoom={setSelectedRoom}
            />
          );
        })}
      </div>
    </div>
  );
}
