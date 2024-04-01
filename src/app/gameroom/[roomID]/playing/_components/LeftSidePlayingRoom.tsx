"use client";
import NameCard from "./NameCard";
import PlayerCard from "./PlayerCard";
import Timer from "./Timer";
import { type RouterOutputs } from "@ktm/trpc/react";
import { api } from "@ktm/trpc/react";
import { usePusher } from "@ktm/app/_context/PusherContext";
import { type Channel } from "pusher-js";
import { useEffect, useState } from "react";
import { Dayjs } from "@ktm/utils/dayjs";

// interface LeftSidePagePlayingRoom {
//   id: number;
//   roomName: string;
//   maxPlayers: number;
//   rounds: number;
//   description: string;
//   isBegin: boolean;
//   createdAt: Date;
// }

type RecentRound = NonNullable<RouterOutputs["gameRoom"]["getRecentRound"]>;
type GameRoom = NonNullable<RouterOutputs["gameRoom"]["getGameRoom"]>;
export default function LeftSidePlayingRoom(props: {
  recentRound: RecentRound;
  gameRoom: GameRoom;
}) {
  const { isSuccess, data } = api.auth.me.useQuery();
  let chatChannel: Channel | null = null;
  const pusher = usePusher();
  const deadTime = props.recentRound.startedAt.valueOf() + 24000;
  const isEnd = new Date().valueOf() >= deadTime;
  const utils = api.useUtils();
  const exitChat = api.chat.exitChat.useMutation();
  chatChannel = pusher.subscribe(`gameroom-${props.gameRoom.id}`);
  useEffect(() => {
    chatChannel.bind("start-round", async (data: string) => {
      console.log(data);
      console.log("bruce");
      await utils.gameRoom.getRecentRound.invalidate();
    });

    return () => {
      chatChannel.unbind_all();
    };
  }, [utils, chatChannel]);

  useEffect(() => {
    const beforeUnload = (event: BeforeUnloadEvent) => {
      exitChat.mutate();
      event.preventDefault();
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  });

  const [timeLeft, setTimeLeft] = useState("04:00");
  useEffect(() => {
    const timeDiff = deadTime - Date.now();
    const interval = setInterval(() => {
      if (timeDiff > 0) {
        setTimeLeft(Dayjs(timeDiff).format("mm:ss"));
      } else {
        setTimeLeft("00:00");
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
        {props.gameRoom.description} fsad ladsjfskld;fjd
        sfkals;djfksdl;fjkasdfjasl;dj
        kjafl;sjdkfja;sdjfksd;lfjsdakfsa;lsssddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
      </div>

      <div className=" w-full flex-1 flex-col space-y-2 rounded-md bg-background p-2">
        {props.recentRound.UserResult.map((e) => {
          if (!isEnd && e.user.id !== data?.userId) {
            return (
              <PlayerCard
                userId={e.user.id}
                chatId={e.chatId}
                roundId={e.roundId}
                key={e.id}
                name={e.user.username}
                isAlive={e.status === "alive"}
                point={e.point}
                word={e.kuamTongHarm}
              />
            );
          }
          return <NameCard key={e.id} isMe name={e.user.username} />;
        })}
      </div>

      {isEnd ? "" : <Timer deadline={timeLeft} />}
    </div>
  );
}
