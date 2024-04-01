"use client";
import { api } from "@ktm/trpc/react";
import { redirect } from "next/navigation";
import GameWrapper from "@ktm/app/gameroom/_components/GameWrapper";
import LeftSideWaitingRoom from "./_components/LeftSideWaitingRoom";
import { useEffect } from "react";
export default function Chat({ params }: { params: { roomId: string } }) {
  const user = api.auth.me.useQuery(undefined, {});
  const joinChat = api.gameRoom.joinGameRoom.useMutation();

  const { isSuccess, data } = api.gameRoom.getGameRoom.useQuery({
    roomId: parseInt(params.roomId),
  });

  useEffect(() => {
    joinChat.mutate({ roomId: parseInt(params.roomId) });
  }, [params.roomId]);

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
