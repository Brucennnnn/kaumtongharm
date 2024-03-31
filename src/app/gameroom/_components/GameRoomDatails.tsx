import { Button } from "@ktm/components/ui/button";
import { type gameRoom } from "../interfaces";
import { cn } from "@ktm/lib/utils";
import { useRouter } from "next/navigation";

interface GameRoomDetailsProps {
  room: gameRoom;
}

export default function GameRoomDetails(props: GameRoomDetailsProps) {
  const { room } = props;
  const router = useRouter();
  const handleJoin = () => {
    if (room.players.length >= room.maxPlayer) {
      return;
    }
    router.push(`gameroom/${room._id}/wating`);
  };
  return (
    <div className="flex h-80 min-h-fit w-full flex-col gap-y-3 rounded-2xl bg-main p-3">
      <div className="flex h-fit w-full flex-col gap-y-2">
        <div className="line-clamp-1 h-fit w-fit max-w-full items-center rounded-md bg-background p-2 text-3xl font-bold text-stroke">
          {room.name}
        </div>
        <div className="flex h-fit w-full flex-row gap-x-2.5">
          <div className="line-clamp-1 items-center rounded-md bg-background p-2 text-xl font-bold text-stroke">
            {`Player: ${room.players.length}/${room.maxPlayer}`}
          </div>
          <div className="line-clamp-1 items-center rounded-md bg-background p-2 text-xl font-bold text-stroke">
            {`${room.maxRound} Rounds`}
          </div>
        </div>
      </div>
      <div className="line-clamp-4 h-full w-full rounded-[10px] bg-background p-3 text-xl font-bold text-stroke">
        {room.details}
      </div>
      <div className="flex h-10 w-full flex-row-reverse">
        <Button
          className={cn(
            "h-full w-[120px] rounded-md border-2 border-b-4 border-r-4 border-stroke bg-secondary text-base font-bold",
            room.players.length >= room.maxPlayer ? "cursor-not-allowed" : "",
          )}
          onClick={() => {
            handleJoin();
          }}
        >
          Join
        </Button>
      </div>
    </div>
  );
}
