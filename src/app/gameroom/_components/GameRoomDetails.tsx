'use client';
import { Button } from '@ktm/components/ui/button';
import { type gameRoom } from '../interfaces';
import { cn } from '@ktm/lib/utils';
import { useRouter } from 'next/navigation';
import { api } from '@ktm/trpc/react';

interface GameRoomDetailsProps {
  room: gameRoom;
}

export default function GameRoomDetails(props: GameRoomDetailsProps) {
  const { room } = props;
  const router = useRouter();
  const joinGameRoom = api.gameRoom.joinGameRoom.useMutation();
  const { data } = api.auth.me.useQuery();

  const handleJoin = async () => {
    if (room.currentPlayers >= room.maxPlayers) {
      return;
    }
    await joinGameRoom.mutateAsync({
      roomId: props.room.id,
      username: data?.username ?? 'Unknown',
    });
    router.push(`gameroom/${props.room.id}`);
    // joinChat.mutate({
    //   chatId: 1,
    // });
    // router.push(`gameroom/1`);
  };
  return (
    <div className="flex min-h-[300px] w-full flex-col justify-between h-fit">
      <div className="flex h-full min-h-fit w-full flex-col gap-y-3 rounded-2xl  bg-main p-3 shadow-card">
        <div className="line-clamp-1 h-fit w-fit max-w-full items-center rounded-md bg-background px-2 py-1 text-2xl font-bold leading-10 text-stroke">
          {room.roomName}
        </div>
        <div className="flex h-fit w-full flex-row gap-x-2.5">
          <div className="line-clamp-1 items-center rounded-md bg-background p-2 text-lg font-bold text-stroke">
            {`Player: ${room.currentPlayers}/${room.maxPlayers}`}
          </div>
          <div className="line-clamp-1 items-center rounded-md bg-background p-2 text-lg font-bold text-stroke">
            {`${room.rounds} Rounds`}
          </div>
        </div>
        <div className="line-clamp-4 h-full lg:h-fit min-h-[100px] w-full rounded-[10px] bg-background p-3 py-1 text-lg font-bold text-stroke">
          {room.description}
        </div>
        <div className="flex h-10 w-full flex-row-reverse">
          <Button
            className={cn(
              'h-full w-[120px] text-stroke secondary rounded-md border-2 border-stroke bg-secondary text-base font-bold shadow-button',
              room.currentPlayers >= room.maxPlayers ? 'cursor-not-allowed' : '',
            )}
            onClick={handleJoin}
          >
            Join
          </Button>
        </div>
      </div>
    </div>
  );
}
