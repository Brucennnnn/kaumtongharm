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
import { socket } from '@ktm/action/socket';
import { Button } from '@ktm/components/ui/button';
import { usePopUpStore } from '@ktm/app/stores/popup';
import { Dialog, DialogContent } from '@ktm/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ktm/components/ui/form';
import { Input } from '@ktm/components/ui/input';
import { z } from 'zod';
const FormSchema = z.object({
  word: z.string(),
});

type RecentRound = NonNullable<RouterOutputs['gameRoom']['getRecentRound']>;
type GameRoom = NonNullable<RouterOutputs['gameRoom']['getGameRoom']>;

export default function LeftSidePlayingRoom(props: { recentRound: RecentRound; gameRoom: GameRoom }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      word: '',
    },
  });
  const { isSuccess, data } = api.auth.me.useQuery();
  const [dialog, setIsDialog] = useState(false);
  let chatChannel: Channel | null = null;
  const pusher = usePusher();
  const deadTime = props.recentRound.result.startedAt.valueOf() + 9000;

  const { open, setOpen } = usePopUpStore();
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
    chatChannel.bind('start-round', async () => {
      await utils.gameRoom.getRecentRound.invalidate();
      socket.emit('announcement-message', {
        channel: `announcement-channel-${props.gameRoom.id}`,
        type: 'round',
        message: `Rounded ${props.gameRoom.rounds} started!!!`,
      });
    });
    chatChannel.bind('playing-room', async (data2: { status: string; userDeath: string; userVote: string }) => {
      if (data2.status === 'end-game') {
        router.push(`/gameroom/${props.gameRoom.id}`);
      }
      if (data2.status === 'refresh') {
        await utils.gameRoom.getRecentRound.invalidate();
        const userName = stringObject[data2.userVote];
        if (data2.userDeath === data?.id && userName) {
          socket.emit('announcement-message', {
            channel: `announcement-channel-${props.gameRoom.id}`,
            type: 'eliminate',
            message: `${data?.username} eleminated by ${userName}`,
          });
        }
      }
    });

    return () => {
      chatChannel.unbind_all();
    };
  }, [utils, chatChannel, router, props.gameRoom.id]);

  useEffect(() => {
    const beforeUnload = (event: BeforeUnloadEvent) => {
      exitChat.mutate({
        roomId: props.gameRoom.id,
        username: data?.username ?? 'Unknown',
      });
      event.preventDefault();
    };
    window.addEventListener('beforeunload', beforeUnload);
    return () => {
      window.removeEventListener('beforeunload', beforeUnload);
    };
  });
  useEffect(() => {
    if (dialog) {
      const timer = setTimeout(() => {
        setIsDialog(false);
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [dialog]);

  const [timeLeft, setTimeLeft] = useState('04:00');
  useEffect(() => {
    const timeDiff = deadTime - Date.now();
    const interval = setInterval(() => {
      setTimeLeft(Dayjs(timeDiff).format('mm:ss'));
    }, 1000);
    if (timeDiff <= 0) {
      clearInterval(interval);
      setTimeLeft('00:00');
      setIsDialog(true);
    }
    return () => clearInterval(interval);
  }, [timeLeft, deadTime]);

  if (isSuccess && !data) return <></>;

  function onSubmit(inp: z.infer<typeof FormSchema>) {
    if (!data) return;
    // if (inp.word === answerWord) {
    //   console.log(true);
    // }
  }
  return (
    <div className="flex h-full w-full flex-col gap-3 min-h-full">
      <div className="flex w-full justify-between  ">
        <div className="flex items-center justify-center rounded-md bg-background p-2 font-bold text-stroke">
          {props.gameRoom.roomName}
        </div>
        <div className="flex items-center justify-center rounded-md bg-background p-2 font-bold text-stroke">
          Players: {props.gameRoom.maxPlayers}
        </div>
      </div>
      {props.gameRoom.description && (
        <div className=" flex items-center break-all rounded-md bg-background p-2 font-bold text-stroke ">
          {props.gameRoom.description}
        </div>
      )}

      <div className=" w-full flex-1 flex-col space-y-2 rounded-md bg-background p-2 max-h-[200px]  lg:max-h-full lg:h-full scroll">
        {props.recentRound.result.UserResult.map((e) => {
          if (!isEnd) {
            if (e.user.id !== data?.id) {
              return (
                <PlayerCard
                  userId={e.user.id}
                  chatId={e.chatId}
                  roundId={e.roundId}
                  fromUser={data?.username ?? ''}
                  key={e.id}
                  name={e.user.username}
                  isAlive={e.status === 'alive'}
                  point={e.point}
                  word={e.kuamTongHarm}
                />
              );
            }
            return (
              <NameCard
                key={e.id}
                isMe
                name={e.user.username}
                isAlive={e.status === 'alive'}
                point={e.point}
                word={e.status === 'alive' ? '' : e.kuamTongHarm}
              />
            );
          }
          return (
            <NameCard key={e.id} isMe name={e.user.username} isAlive={true} point={e.point} word={e.kuamTongHarm} />
          );
        })}
      </div>

      <Button
        onClick={() => setOpen(true)}
        className="flex lg:hidden w-full rounded-md border-2 border-stroke yellow p-3 text-base font-bold text-stroke shadow-button"
      >
        Chat
      </Button>

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
      <Dialog open={dialog} onOpenChange={setIsDialog}>
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
              <FormField
                control={form.control}
                name="word"
                render={({ field }) => (
                  <FormItem>
                    <Input placeholder="shadcn" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
