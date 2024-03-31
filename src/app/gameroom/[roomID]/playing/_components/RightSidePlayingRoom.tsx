"use client";
import { Button } from "@ktm/components/ui/button";
import { api } from "@ktm/trpc/react";

export default function RightSidePlayingRoom(props: { roomId: string }) {
  const startRound = api.gameRoom.startRound.useMutation();
  const joinChat = api.chat.joinChat.useMutation();
  const exitChat = api.chat.exitChat.useMutation();

  const utils = api.useUtils();
  const handleStartRound = async () => {
    await startRound.mutateAsync({
      roomId: parseInt(props.roomId),
    });
    await utils.gameRoom.getRecentRound.invalidate();
  };
  const handleJoinChat = () => {
    joinChat.mutate({ chatId: 1 });
  };
  const handleExitChat = () => {
    exitChat.mutate();
  };

  return (
    <div className="flex h-full w-full flex-col ">
      <Button onClick={() => handleStartRound()} className="w-fit bg-error">
        Start Round
      </Button>
      <Button onClick={() => handleJoinChat()} className="w-fit bg-success">
        Join Chat
      </Button>

      <Button onClick={() => handleExitChat()} className="w-fit bg-success">
        Exit Chat
      </Button>
    </div>
  );
}
