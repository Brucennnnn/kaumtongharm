"use client";
import { type gameRoom } from "../interfaces";
import GameRoomBox from "./GameRoomBox";
import { type Dispatch, type SetStateAction, useState } from "react";

interface gameRoomListProps {
  setSelectedRoom: Dispatch<SetStateAction<gameRoom | null>>;
  allRooms: gameRoom[];
}

export default function GameRoomList(props: gameRoomListProps) {
  const [selectesRoomId, setSelectedRoomId] = useState<number | null>(null);
  const { allRooms, setSelectedRoom } = props;
  return (
    <div className="flex h-full w-full flex-col gap-y-3 rounded-lg bg-background p-3">
      {allRooms ? (
        allRooms.map((item: gameRoom, _index) => {
          return (
            <div
              className="h-fit w-full"
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
  );
}
