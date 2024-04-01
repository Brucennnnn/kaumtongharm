"use client";
import NameCard from "../playing/_components/NameCard";
import PlayerCard from "../playing/_components/PlayerCard";
import { type RouterOutputs } from "@ktm/trpc/react";
import { api } from "@ktm/trpc/react";
import { usePusher } from "@ktm/app/_context/PusherContext";
import { type Channel } from "pusher-js";
import { useEffect, useState } from "react";
import { Button } from "@ktm/components/ui/button";
import { Dayjs } from "@ktm/utils/dayjs";

import { useRouter } from "next/navigation";

type GameRoom = NonNullable<RouterOutputs["gameRoom"]["getGameRoom"]>;
export default function LeftSideWaitingRoom(props: { gameRoom: GameRoom }) {
  const { isSuccess, data } = api.auth.me.useQuery();
  const router = useRouter();
  // const chatChannel: Channel | null = null;
  // const pusher = usePusher();
  // const utils = api.useUtils();
  const exitChat = api.chat.exitChat.useMutation();
  // chatChannel = pusher.subscribe(`gameroom-${props.gameRoom.id}`);
  // useEffect(() => {
  //   chatChannel.bind("start-round", async (data: string) => {
  //     console.log(data);
  //     console.log("bruce");
  //     await utils.gameRoom.getRecentRound.invalidate();
  //   });
  //
  //   return () => {
  //     chatChannel.unbind_all();
  //   };
  // }, [utils, chatChannel]);
  async function handleExitButton() {
    await exitChat.mutateAsync();
    router.push("/gameroom");
  }

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

  if (isSuccess && !data) return <></>;
  return (
    <div className="flex h-full w-full flex-col gap-3">
      <div className="flex w-full justify-between  ">
        <div className="flex items-center justify-center rounded-md bg-background p-2 font-bold text-stroke">
          {props.gameRoom.roomName}
        </div>
        <div className="flex items-center justify-center rounded-md bg-background p-2 font-bold text-stroke">
          Players :{" "}
          <span className="h4 text-orange">
            {props.gameRoom.chat?.User.length}
          </span>
          /{props.gameRoom.maxPlayers}
        </div>
      </div>
      <div className=" flex items-center break-all rounded-md bg-background p-2 font-bold text-stroke ">
        {props.gameRoom.description}
      </div>

      <div className=" w-full flex-1 flex-col space-y-2 rounded-md bg-background p-2">
        {props.gameRoom.chat?.User.map((e) => {
          return <NameCard key={e.id} isMe name={e.username} />;
        })}
      </div>
      <div className="flex w-full">
        <Button
          onClick={() => handleExitButton()}
          className="w-[102px] rounded-md border-2 border-stroke bg-error p-3 text-base font-bold text-white shadow-button"
        >
          back
        </Button>
      </div>
    </div>
  );
}
