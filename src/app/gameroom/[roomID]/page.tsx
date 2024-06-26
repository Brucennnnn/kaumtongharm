'use client';
import { api } from '@ktm/trpc/react';
import GameWrapper from '@ktm/app/gameroom/_components/GameWrapper';
import LeftSideWaitingRoom from './_components/LeftSideWaitingRoom';
import { ChatContainer } from './_components/ChatContainer';

export default function Chat({ params }: { params: { roomID: string } }) {
  const user = api.auth.me.useQuery(undefined, {});

  const { data } = api.gameRoom.getGameRoom.useQuery({
    roomId: parseInt(params.roomID),
  });

  if (!data || (user.isSuccess && !user.data) || !user.isSuccess || !user.data) return <></>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-bgImage bg-cover bg-center">
      <GameWrapper
        leftside={<LeftSideWaitingRoom gameRoom={data} />}
        rightside={
          <div className="flex w-full min-h-full">
            <ChatContainer roomsChannel={params.roomID} gameRoom={data} />
          </div>
        }
        me={user.data}
      ></GameWrapper>
    </div>
  );
}
