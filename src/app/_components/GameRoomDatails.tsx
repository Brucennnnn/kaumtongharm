export default function GameRoomDetails() {
  return (
    <div className="flex h-80 w-full flex-col gap-y-3 rounded-2xl bg-main p-3">
      <div className="flex h-fit w-full flex-col gap-y-2">
        <div className="flex h-[45px] w-fit max-w-full items-center rounded-md bg-background px-2">
          <div className="line-clamp-1 text-3xl font-bold text-stroke">
            Kon thai
          </div>
        </div>
        <div className="flex h-[35px] w-full flex-row gap-x-2.5">
          <div className="flex items-center rounded-md bg-background px-2">
            <div className="text-xl font-bold text-stroke">Players</div>
          </div>
          <div className="flex items-center rounded-md bg-background px-2">
            <div className="text-xl font-bold text-stroke">3 Rounds</div>
          </div>
        </div>
      </div>
      <div className="h-full w-full rounded-[10px] bg-background p-3"></div>
    </div>
  );
}
