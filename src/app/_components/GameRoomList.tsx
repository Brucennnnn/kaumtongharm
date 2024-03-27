"use client";
import { type gameRoom } from "../interfaces";
import GameRoomBox from "./GameRoomBox";
import { type Dispatch, type SetStateAction, useState } from "react";

import { Button } from "@ktm/components/ui/button";
import { Input } from "@ktm/components/ui/input";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface gameRoomListProps {
  setSelectedRoom: Dispatch<SetStateAction<gameRoom | null>>;
  allRooms: gameRoom[];
}

export default function GameRoomList(props: gameRoomListProps) {
  const [searchString, setSearchString] = useState("");
  const [selectesRoomId, setSelectedRoomId] = useState<number | null>(null);
  const { allRooms, setSelectedRoom } = props;
  return (
    <div className="flex h-full w-full flex-col gap-3">
      <div className="flex w-full justify-end">
        <Button className="text-md rounded-md border border-stroke bg-pending font-bold">
          Create Game
        </Button>
      </div>
      <div className="relative w-full">
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-3 top-3 self-center text-stroke"
          size="lg"
        />
        <Input
          placeholder="Search Room"
          className="text-md h-fit w-full rounded-md border-none bg-background py-2  pl-10 text-lg font-semibold text-stroke focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
        />
      </div>
      <div className="flex h-full w-full flex-col gap-y-3 overflow-y-scroll rounded-lg bg-background p-3">
        {allRooms ? (
          allRooms.map((item: gameRoom, _index) => {
            return (
              <div
                className="h-fit w-full hover:cursor-pointer"
                key={_index}
                onClick={() => {
                  setSelectedRoomId(_index);
                  setSelectedRoom(item);
                }}
              >
                <GameRoomBox
                  maxPlayer={item.maxPlayer}
                  name={item.name}
                  players={item.players}
                  status={item.status}
                  isSelected={_index == selectesRoomId}
                />
              </div>
            );
          })
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
