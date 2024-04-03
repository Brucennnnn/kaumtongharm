"use client";
import { Button } from "@ktm/components/ui/button";
import { api } from "@ktm/trpc/react";
import { cn } from "@ktm/lib/utils";

export default function GoNextButton({
  isOwner,
  isNext,
  roomId,
  handleEndGame,
}: {
  isOwner: boolean;
  isNext: boolean;
  roomId: number;
  handleEndGame: () => void;
}) {
  const continueGame = api.gameRoom.startRound.useMutation();
  function handleOnClick() {
    if (isNext) {
      continueGame.mutate({ roomId });
    } else {
      handleEndGame();
    }
  }

  return (
    <Button
      className={cn(
        "rounded-md border-2 border-stroke  p-3 text-base font-bold text-stroke shadow-button",
        {
          hidden: !isOwner,
        },
        isNext ? "bg-pending" : "bg-error",
      )}
      onClick={handleOnClick}
    >
      {isNext ? "Continue game" : "End game"}
    </Button>
  );
}
