'use client';
import NameCard from './NameCard';
import PlayerCard from './PlayerCard';
import Timer from './Timer';
import { type RouterOutputs } from '@ktm/trpc/react';
import { api } from '@ktm/trpc/react';
import { usePusher } from '@ktm/app/_context/PusherContext';
import { type Channel } from 'pusher-js';
import { useEffect, useState } from 'react';
import { Dayjs } from '@ktm/utils/dayjs';
import GoNextButton from './GoNextButton';
import { useRouter } from 'next/navigation';
import { useToast } from '@ktm/components/ui/use-toast';

type RecentRound = NonNullable<RouterOutputs['gameRoom']['getRecentRound']>;
type GameRoom = NonNullable<RouterOutputs['gameRoom']['getGameRoom']>;

export default function LeftSidePlayingRoom(props: { recentRound: RecentRound; gameRoom: GameRoom }) {
  const { isSuccess, data } = api.auth.me.useQuery();
  let chatChannel: Channel | null = null;
  const pusher = usePusher();
  const deadTime = props.recentRound.result.startedAt.valueOf() + 300000;
  const isEnd = new Date().valueOf() >= deadTime;
  const utils = api.useUtils();
  const router = useRouter();
  const exitChat = api.chat.exitChat.useMutation();
  const endGame = api.gameAction.endGame.useMutation();
  const { toast } = useToast();
  chatChannel = pusher.subscribe(`gameroom-${props.gameRoom.id}`);
  const stringObject: Record<string, string> = Object.fromEntries(
    props.recentRound.result.UserResult.map((e) => [e.user.id, e.user.username]),
  );
  async function handleEndGame() {
    const result = await endGame.mutateAsync({
      roomId: props.gameRoom.id,
      take: props.gameRoom.rounds,
    });
    toast({
      title: 'Result',
      variant: 'default',
      description: (
        <div>
          {result.map((e) => {
            const userName = stringObject[e.userId];
            if (userName) {
              return (
                <span key={e.userId}>
                  {stringObject[e.userId]} have {e._sum.point} points
                </span>
              );
            }
          })}
        </div>
      ),
    });
  }
  useEffect(() => {
    chatChannel.bind('start-round', async (data: string) => {
      await utils.gameRoom.getRecentRound.invalidate();
    });
    chatChannel.bind('playing-room', async (data: { status: string }) => {
      if (data.status === 'end-game') {
        router.push(`/gameroom/${props.gameRoom.id}`);
      }
      if (data.status === 'refresh') {
        await utils.gameRoom.getRecentRound.invalidate();
      }
    });

    return () => {
      chatChannel.unbind_all();
    };
  }, [utils, chatChannel, router, props.gameRoom.id]);

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

  const [timeLeft, setTimeLeft] = useState('04:00');
  useEffect(() => {
    const timeDiff = deadTime - Date.now();
    const interval = setInterval(() => {
      if (timeDiff > 0) {
        setTimeLeft(Dayjs(timeDiff).format('mm:ss'));
      } else {
        setTimeLeft('00:00');
      }
    }, 1000);

    return () => clearInterval(interval);
  });
  if (isSuccess && !data) return <></>;
  return (
    <div className="flex h-full w-full flex-col gap-3">
      <div className="flex w-full justify-between  ">
        <div className="flex items-center justify-center rounded-md bg-background p-2 font-bold text-stroke">
          {props.gameRoom.roomName}
        </div>
        <div className="flex items-center justify-center rounded-md bg-background p-2 font-bold text-stroke">
          Players: {props.gameRoom.maxPlayers}
        </div>
      </div>
      <div className=" flex items-center break-all rounded-md bg-background p-2 font-bold text-stroke ">
        {props.gameRoom.description}
      </div>

      <div className=" w-full flex-1 flex-col space-y-2 rounded-md bg-background p-2">
        {props.recentRound.result.UserResult.map((e) => {
          if (!isEnd) {
            if (e.user.id !== data?.id) {
              return (
                <PlayerCard
                  userId={e.user.id}
                  chatId={e.chatId}
                  roundId={e.roundId}
                  key={e.id}
                  name={e.user.username}
                  isAlive={e.status === 'alive'}
                  point={e.point}
                  word={e.kuamTongHarm}
                />
              );
            }
            return <NameCard key={e.id} isMe name={e.user.username} isAlive={e.status === 'alive'} point={e.point} />;
          }
          return <NameCard key={e.id} isMe name={e.user.username} isAlive={true} />;
        })}
      </div>

      {isEnd ? (
        <GoNextButton
          isNext={props.recentRound.isNext}
          isOwner={data?.id === props.gameRoom.hostId}
          roomId={props.gameRoom.id}
          handleEndGame={handleEndGame}
        />
      ) : (
        <Timer deadline={timeLeft} />
      )}
    </div>
  );
}
