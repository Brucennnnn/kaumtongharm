"use client";
import GameWrapper from "@ktm/app/gameroom/_components/GameWrapper";
import LeftSidePlayingRoom from "./_components/LeftSidePlayingRoom";
import { api } from "@ktm/trpc/react";
import RightSidePlayingRoom from "./_components/RightSidePlayingRoom";

export default function Page({ params }: { params: { roomId: string } }) {
  const { isSuccess, data } = api.gameRoom.getGameRoom.useQuery({
    roomId: parseInt(params.roomId),
  });

  const round = api.gameRoom.getRecentRound.useQuery({
    roomId: parseInt(params.roomId),
  });
  if ((isSuccess && !data) || !isSuccess || !data) return <></>;
  if (
    data.isBegin &&
    ((round.isSuccess && !round.data) ||
      !round.isSuccess ||
      !round.data?.UserResult)
  ) {
    return <></>;
  }
  console.log(round.data);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <GameWrapper
        leftside={
          round.data?.UserResult ? (
            <LeftSidePlayingRoom recentRound={round.data} gameRoom={data} />
          ) : (
            <div>NoUserResult</div>
          )
        }
        rightside={
          <RightSidePlayingRoom roomId={params.roomId} chatId={data.chat?.id} />
        }
      ></GameWrapper>
    </div>
  );
}
