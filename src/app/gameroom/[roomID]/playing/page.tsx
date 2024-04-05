'use client';
import GameWrapper from '@ktm/app/gameroom/_components/GameWrapper';
import LeftSidePlayingRoom from './_components/LeftSidePlayingRoom';
import { api } from '@ktm/trpc/react';
import { useRouter } from 'next/navigation';
import { ChatContainer } from '../_components/ChatContainer';
import { useEffect } from 'react';

export default function Page({ params }: { params: { roomID: string } }) {
  const router = useRouter();
  const { isSuccess, data } = api.gameRoom.getGameRoom.useQuery({
    roomId: parseInt(params.roomID),
  });

  const me = api.auth.me.useQuery(undefined, {});
  useEffect(() => {
    if (me.isSuccess && !me.data) {
      router.push('/login');
    }
  }, [me.isSuccess, me.data]);

  const round = api.gameRoom.getRecentRound.useQuery({
    roomId: parseInt(params.roomID),
  });
  if ((isSuccess && !data) || !isSuccess || !data || !me.data) return <></>;
  if (data.isBegin && ((round.isSuccess && !round.data) || !round.isSuccess || !round.data?.result.UserResult)) {
    return <></>;
  }
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-bgImage bg-cover bg-center">
      <GameWrapper
        leftside={
          round.data?.result.UserResult ? (
            <LeftSidePlayingRoom recentRound={round.data} gameRoom={data} />
          ) : (
            <div>NoUserResult</div>
          )
        }
        rightside={
          <div className="flex w-full min-h-full">
            <ChatContainer roomsChannel={params.roomID} gameRoom={data} />
          </div>
        }
        me={me.data}
      ></GameWrapper>
    </div>
  );
}
