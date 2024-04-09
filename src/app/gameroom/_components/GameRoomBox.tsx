'use client';
import { cn } from '@ktm/lib/utils';
import { type gameRoom } from '../interfaces';
import { Button } from '@ktm/components/ui/button';
import { type Dispatch, type SetStateAction } from 'react';

interface gameRoomBoxProps {
  selectedroom: gameRoom | null;
  room: gameRoom;
  setSelectedRoom: (room: gameRoom | null) => void;
}

export default function GameRoomBox(props: gameRoomBoxProps) {
  const { room, selectedroom, setSelectedRoom } = props;
  return (
    <Button
      onClick={() => {
        setSelectedRoom(room);
      }}
      className={cn(
        'flex h-fit w-full flex-row items-center gap-2 rounded-md bg-roombg p-2.5 py-2 hover:bg-hardpink',
        room?.id == selectedroom?.id ? 'border-2 border-stroke bg-hardpink shadow-box' : '',
      )}
    >
      <div className="flex h-fit w-full grow flex-col justify-between overflow-hidden">
        <div className="line-clamp-1 h-fit text-start text-base font-bold text-stroke">{room?.roomName}</div>
        <div
          className={cn(
            'line-clamp-1 h-fit text-start text-xs font-bold text-stroke',
            !room?.isBegin ? 'text-availble' : 'text-error',
          )}
        >
          {!room?.isBegin ? 'Availble' : 'In game'}
        </div>
      </div>
      <div className="h-fit text-base font-bold text-stroke">{`${room?.currentPlayers}/${room?.maxPlayers}`}</div>
    </Button>
  );
}
