import PlayerCard from "./PlayerCard";
import Timer from "./Timer";
import { type RouterOutputs } from "@ktm/trpc/react";
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

      <div className=" w-full flex-1  flex-col rounded-md bg-background p-2">
        {props.recentRound.UserResult.map((e) => {
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
