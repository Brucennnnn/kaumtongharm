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
    // if (room.currentPlayers >= room.maxPlayers) {
    //   return;
    // }
    router.push(`gameroom/${room.id}`);
  };
  return (
    <div className="flex h-80 min-h-fit w-full flex-col gap-y-3 rounded-2xl border-2 border-stroke bg-main p-3 shadow-card">
      <div className="flex h-fit w-full flex-col gap-y-2">
        <div className="line-clamp-1 h-fit w-fit max-w-full items-center rounded-md bg-background px-2 py-1 text-2xl font-bold leading-10 text-stroke">
          {room.roomName}
        </div>
        <div className="flex h-fit w-full flex-row gap-x-2.5">
          <div className="line-clamp-1 items-center rounded-md bg-background p-2 text-lg font-bold text-stroke">
            {`Player: ${room.currentPlayers}/${room.maxPlayers}`}
          </div>
          <div className="line-clamp-1 items-center rounded-md bg-background p-2 text-lg font-bold text-stroke">
            {`${room.rounds} Rounds`}
          </div>
        </div>
      </div>
      <div className="line-clamp-4 h-full w-full rounded-[10px] bg-background p-3 py-1 text-lg font-bold text-stroke">
        {room.description}
      </div>
      <div className="flex h-10 w-full flex-row-reverse">
        <Button
          className={cn(
            "h-full w-[120px] rounded-md border border-stroke bg-secondary text-base font-bold shadow-button",
            // room.currentPlayers >= room.maxPlayers ? "cursor-not-allowed" : "",
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
