import Timer from "./Timer";
import type { RouterOutputs } from "@ktm/trpc/react";
interface LeftSidePagePlayingRoom {
  id: number;
  gameTitle: string;
  maxPlayers: number;
  rounds: number;
  description: string;
  chatId: number;
  isBegin: boolean;
  createdAt: Date;
}

type UserResultType =
  NonNullable<RouterOutputs["game"]["getRecentRound"]> extends {
    UserResult: infer U;
  }
    ? U
    : never;
export default function LeftSidePlayingRoom(
  props: {
    userResult: UserResultType;
  } & LeftSidePagePlayingRoom,
) {
  return (
    <div className="flex h-full w-full flex-col gap-3">
      <div className="flex w-full justify-between  ">
        <div className="flex items-center justify-center rounded-md bg-background p-2 font-bold text-stroke">
          {props.gameTitle}
        </div>

        <div className="flex items-center justify-center rounded-md bg-background p-2 font-bold text-stroke">
          Players: {props.maxPlayers}
        </div>
      </div>
      <div className=" flex items-center break-all rounded-md bg-background p-2 font-bold text-stroke ">
        {props.description} fsad ladsjfskld;fjd sfkals;djfksdl;fjkasdfjasl;dj
        kjafl;sjdkfja;sdjfksd;lfjsdakfsa;lsssddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
      </div>

      <div className=" w-full flex-1  flex-col rounded-md bg-background p-2"></div>

      <Timer deadline={new Date().valueOf() + 240000} />
    </div>
  );
}
