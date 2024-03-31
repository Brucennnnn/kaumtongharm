import { cn } from "@ktm/lib/utils";
import { type player } from "../interfaces";

interface gameRoomBoxProps {
  name: string;
  isBegin: boolean;
  players: player[];
  maxPlayer: number;
  isSelected: boolean;
}

export default function GameRoomBox(props: gameRoomBoxProps) {
  const { name, isBegin, players, maxPlayer, isSelected } = props;
  return (
    <div
      className={cn(
        "flex h-fit w-full flex-row items-center rounded-md bg-box p-2.5",
        isSelected
          ? "border-[1.5px] border-b-[3px] border-r-[3px] border-solid border-stroke"
          : "",
      )}
    >
      <div className="flex h-fit grow flex-col justify-between">
        <div className="line-clamp-1 h-fit text-base font-bold text-stroke">
          {name}
        </div>
        <div
          className={cn(
            "line-clamp-1 text-xs font-bold text-stroke",
            !isBegin ? "text-availble" : "text-error",
          )}
        >
          {!isBegin ? "Availble" : "In game"}
        </div>
      </div>
      <div className="h-fit text-base font-bold text-stroke">{`${players.length}/${maxPlayer}`}</div>
    </div>
  );
}
