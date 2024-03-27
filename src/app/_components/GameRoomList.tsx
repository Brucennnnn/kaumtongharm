"use client";
import { type gameRoom } from "../interfaces";
import GameRoomBox from "./GameRoomBox";
import { useState } from "react";

interface gameRoomListProps {
  allRooms: gameRoom[];
}

export default function GameRoomList(props: gameRoomListProps) {
  const [selectesRoomId, setSelectedRoomId] = useState<number | null>(null);
  const { allRooms } = props;
  return (
    <div className="flex h-full w-full flex-col gap-y-3 rounded-lg bg-background p-3">
      {allRooms ? (
        allRooms.map((item: gameRoom, _index) => {
          return (
            <div
              className="h-fit w-full"
              key={_index}
              onClick={() => {
                console.log(_index);
                setSelectedRoomId(_index);
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
