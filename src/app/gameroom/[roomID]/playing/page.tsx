"use client";
import GameWrapper from "@ktm/app/gameroom/_components/GameWrapper";
import LeftSidePlayingRoom from "./_components/LeftSidePlayingRoom";
import { api } from "@ktm/trpc/react";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@ktm/components/ui/button";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { roomID: string } }) {
  const router = useRouter();
  const { isSuccess, data } = api.gameRoom.getGameRoom.useQuery({
    roomId: parseInt(params.roomID),
  });

  const exitChat = api.chat.exitChat.useMutation();

  // const joinChat = api.gameRoom.joinGameRoom.useMutation();
  const round = api.gameRoom.getRecentRound.useQuery({
    roomId: parseInt(params.roomID),
  });
  if ((isSuccess && !data) || !isSuccess || !data) return <></>;
  if (
    data.isBegin &&
    ((round.isSuccess && !round.data) ||
      !round.isSuccess ||
      !round.data?.result.UserResult)
  ) {
    return <></>;
  }

  async function handleExitButton() {
    await exitChat.mutateAsync({ roomId: parseInt(params.roomID) });
    router.push("/gameroom");
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-bgImage">
      <GameWrapper
        leftside={
          round.data?.result.UserResult ? (
            <LeftSidePlayingRoom recentRound={round.data} gameRoom={data} />
          ) : (
            <div>NoUserResult</div>
          )
        }
        rightside={
          // <RightSidePlayingRoom roomId={params.roomId} chatId={data.chat?.id} />
          <div></div>
        }
      ></GameWrapper>
      <Button
        onClick={handleExitButton}
        className="border-storke h4 absolute bottom-0 right-0 m-3 rounded-md border bg-pending p-4 font-bold text-stroke shadow-button"
      >
        gameroom
      </Button>
    </div>
  );
}
