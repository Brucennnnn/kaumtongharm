'use client';
import NameCard from '../playing/_components/NameCard';
import { type RouterOutputs } from '@ktm/trpc/react';
import { api } from '@ktm/trpc/react';
import { usePusher } from '@ktm/app/_context/PusherContext';
import { type Channel } from 'pusher-js';
import { useEffect, useState } from 'react';
import { Button } from '@ktm/components/ui/button';

import { useRouter } from 'next/navigation';

type GameRoom = NonNullable<RouterOutputs['gameRoom']['getGameRoom']>;
export default function LeftSideWaitingRoom(props: { gameRoom: GameRoom }) {
  const { isSuccess, data } = api.auth.me.useQuery();
  const router = useRouter();
  const exitChat = api.chat.exitChat.useMutation();
  const utils = api.useUtils();

  const startRound = api.gameRoom.startRound.useMutation();
  const handleStartRound = async () => {
    await startRound.mutateAsync({
      roomId: props.gameRoom.id,
    });
  };

  let chatChannel: Channel | null = null;
  const pusher = usePusher();
  chatChannel = pusher.subscribe(`gameroom-${props.gameRoom.id}`);
  useEffect(() => {
    chatChannel.bind('start-round', async (data: string) => {
      router.push(`/gameroom/${props.gameRoom.id}/playing`);
    });
    chatChannel.bind('waiting-room', async (data: string) => {
      await utils.gameRoom.getGameRoom.invalidate();
    });
    return () => {
      chatChannel.unbind_all();
    };
  }, [utils, chatChannel]);

  async function handleExitButton() {
    await exitChat.mutateAsync({ roomId: props.gameRoom.id });
    router.push('/gameroom');
  }

  useEffect(() => {
    const beforeUnload = (event: BeforeUnloadEvent) => {
      exitChat.mutate({ roomId: props.gameRoom.id });
      event.preventDefault();
    };
    window.addEventListener('beforeunload', beforeUnload);
    return () => {
      window.removeEventListener('beforeunload', beforeUnload);
    };
  });

  if (isSuccess && !data) return <></>;
  return (
    <div className="flex  w-full flex-col gap-3 min-h-full ">
      <div className="flex w-full justify-between  ">
        <div className="flex items-center justify-center rounded-md bg-background p-2 font-bold text-stroke">
          {props.gameRoom.roomName}
        </div>
        <div className="flex items-center justify-center rounded-md bg-background p-2 font-bold text-stroke">
          Players : <span className="h4 text-orange">{props.gameRoom.chat?.User.length}</span>/
          {props.gameRoom.maxPlayers}
        </div>
      </div>
      {props.gameRoom.description && (
        <div className=" flex items-center break-all rounded-md bg-background p-2 font-bold text-stroke ">
          {props.gameRoom.description}
        </div>
      )}

      <div className=" w-full flex-1 flex-col space-y-2 rounded-md bg-background p-2 max-h-[200px]  lg:max-h-full lg:h-full scroll">
        {props.gameRoom.chat?.User.map((e) => {
          return <NameCard key={e.id} isMe={e.id === data?.id} name={e.username} isAlive={true} />;
        })}
      </div>
      <div className="flex w-full justify-between">
        <Button
          onClick={() => handleExitButton()}
          className="w-[102px] rounded-md border-2 border-stroke red p-3 text-base font-bold text-stroke shadow-button"
        >
          back
        </Button>
        {data?.id === props.gameRoom.hostId ? (
          <Button
            onClick={() => handleStartRound()}
            className="w-[102px] rounded-md border-2 border-stroke secondary p-3 text-base font-bold text-stroke shadow-button"
          >
            StartRoom
          </Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
