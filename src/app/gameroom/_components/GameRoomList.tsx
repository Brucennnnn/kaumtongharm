"use client";
import { type gameRoom } from "../interfaces";
import GameRoomBox from "./GameRoomBox";
import { type Dispatch, type SetStateAction, useState, useEffect } from "react";

import { Button } from "@ktm/components/ui/button";
import { Input } from "@ktm/components/ui/input";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface gameRoomListProps {
  selectedroom: gameRoom | null;
  setSelectedRoom: Dispatch<SetStateAction<gameRoom | null>>;
  allRooms: gameRoom[];
}

export default function GameRoomList(props: gameRoomListProps) {
  const [searchString, setSearchString] = useState("");
  const { allRooms, setSelectedRoom, selectedroom } = props;
  const [filteredRooms, setFilteredRooms] = useState<gameRoom[]>(allRooms);

  useEffect(() => {
    if (searchString != "") {
      const tempFilteredRooms: gameRoom[] = [];
      allRooms.map((room: gameRoom) => {
        if (room.gameTitle.includes(searchString)) {
          tempFilteredRooms.push(room);
        }
      });
      setFilteredRooms(tempFilteredRooms);
    } else {
      setFilteredRooms(allRooms);
    }
  }, [allRooms, searchString]);
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
      <div className="scroll flex w-full grow flex-col gap-y-3 rounded-lg bg-background p-3">
        {filteredRooms && filteredRooms.length != 0 ? (
          filteredRooms.map((item: gameRoom, _index) => {
            return (
              <GameRoomBox
                key={item.id}
                room={item}
                selectedroom={selectedroom}
                setSelectedRoom={setSelectedRoom}
              />
            );
          })
        ) : (
          <div className="flex h-full w-full items-center justify-center font-semibold text-main">
            no results
          </div>
        )}
      </div>
    </div>
  );
}
