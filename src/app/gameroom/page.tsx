'use client';
import { useEffect, useState } from 'react';
import GameRoomList from './_components/GameRoomList';
import { type gameRoom } from './interfaces';
import CardWrapper from './_components/GameWrapper';
import RightSideCreateGame from './_components/RightSideCreateGame';
import GameRoomDetails from './_components/GameRoomDetails';
import { api } from '@ktm/trpc/react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [selectedRoom, setSelectedRoom] = useState<gameRoom | null>(null);

  const { isSuccess, data } = api.gameRoom.getGameRoomsByFilter.useQuery({
    // searchQuery: searchString,
  });

  const router = useRouter();
  const me = api.auth.me.useQuery();

  useEffect(() => {
    if (me.isSuccess && !me.data) {
      router.push('/login');
    }
  }, [me.isSuccess, me.data]);
  if (!data || !me.data) return <></>;

  return (
    <div className="flex  min-h-screen items-center justify-center bg-bgImage bg-cover bg-center p-4 ">
      <CardWrapper
        leftside={
          <GameRoomList
            // setSearchString={setSearchString}
            selectedroom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
            // allGameRoom={data}
          />
        }
        me={me.data}
        rightside={selectedRoom ? <GameRoomDetails room={selectedRoom} /> : <RightSideCreateGame />}
      />
    </div>
  );
}
