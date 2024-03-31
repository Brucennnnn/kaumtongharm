"use client";
import NameCard from "./NameCard";
import PlayerCard from "./PlayerCard";
import Timer from "./Timer";
import { type RouterOutputs } from "@ktm/trpc/react";
import { api } from "@ktm/trpc/react";
import { usePusher } from "@ktm/app/_context/PusherContext";
import { type Channel } from "pusher-js";
import { useEffect } from "react";

interface LeftSidePagePlayingRoom {
  id: number;
  roomName: string;
  maxPlayers: number;
  rounds: number;
  description: string;
  isBegin: boolean;
  createdAt: Date;
}

type RecentRound = NonNullable<RouterOutputs["gameRoom"]["getRecentRound"]>;
type GameRoom = NonNullable<RouterOutputs["gameRoom"]["getGameRoom"]>;
export default function LeftSidePlayingRoom(props: {
  recentRound: RecentRound;
  gameRoom: GameRoom;
}) {
  let chatChannel: Channel | null = null;
  const pusher = usePusher();

  const utils = api.useUtils();
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
  const { isSuccess, data } = api.auth.me.useQuery();
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
          if (e.user.id === data?.userId) {
            return <NameCard key={e.id} isMe name={e.user.username} />;
          }
          return (
            <PlayerCard
              key={e.id}
              name={e.user.username}
              isAlive={e.status === "alive"}
              point={e.point}
              word={e.kuamTongHarm}
            />
          );
        })}
      </div>

      <Timer deadline={props.recentRound.startedAt.valueOf() + 240000} />
    </div>
  );
}
