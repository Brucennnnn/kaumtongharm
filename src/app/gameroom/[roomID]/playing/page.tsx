"use client";
import GameWrapper from "@ktm/app/gameroom/_components/GameWrapper";
import RightSideCreateGame from "@ktm/app/gameroom/_components/RightSideCreateGame";
import LeftSidePlayingRoom from "./_components/LeftSidePlayingRoom";
import { api } from "@ktm/trpc/react";
export default function Page({ params }: { params: { roomID: string } }) {
  const { isSuccess, data } = api.game.getGameRoom.useQuery({
    roomId: parseInt(params.roomID),
  });
  if ((isSuccess && !data) || !isSuccess || !data) return <></>;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <GameWrapper
        leftside={<LeftSidePlayingRoom {...data} />}
        rightside={<RightSideCreateGame />}
      ></GameWrapper>
    </div>
  );
}
