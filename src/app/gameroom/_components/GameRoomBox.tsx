import { cn } from "@ktm/lib/utils";
import { type player } from "../interfaces";

interface gameRoomBoxProps {
  name: string;
  status: number; //round 1-?, 0: not started
  players: player[];
  maxPlayer: number;
  isSelected: boolean;
}

export default function GameRoomBox(props: gameRoomBoxProps) {
  const { name, status, players, maxPlayer, isSelected } = props;
  return (
    <div
      className={cn(
        "bg-box flex h-[58px] w-full flex-row items-center rounded-md p-2.5",
        isSelected ? "border border-solid border-stroke" : "",
      )}
    >
      <div className="flex h-full grow flex-col justify-between">
        <div className="line-clamp-1 text-base font-bold text-stroke">
          {name}
        </div>
        <div
          className={cn(
            "line-clamp-1 text-xs font-bold text-stroke",
            status == 0 ? "text-availble" : "text-error",
          )}
        >
          {status == 0 ? "Availble" : "In game"}
        </div>
      </div>
      <div className="text-base font-bold text-stroke">{`${players.length}/${maxPlayer}`}</div>
    </div>
  );
}
