"use client";
import { api } from "@ktm/trpc/react";
import { redirect } from "next/navigation";
import GameWrapper from "@ktm/app/gameroom/_components/GameWrapper";
import LeftSideWaitingRoom from "./_components/LeftSideWaitingRoom";
import { useEffect } from "react";
export default function Chat({ params }: { params: { roomID: string } }) {
  const user = api.auth.me.useQuery(undefined, {});

  const { isSuccess, data } = api.gameRoom.getGameRoom.useQuery({
    roomId: parseInt(params.roomID),
  });

  if (!data || (user.isSuccess && !user.data) || !user.isSuccess || !user.data)
    return <></>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-bgImage">
      <GameWrapper
        leftside={<LeftSideWaitingRoom gameRoom={data} />}
        rightside={<div className="h-full w-full">no chat</div>}
      ></GameWrapper>
    </div>
  );
}
