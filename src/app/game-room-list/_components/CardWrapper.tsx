<<<<<<<< HEAD:src/app/gameroom/_components/GameWrapper.tsx
export default function GameWrapper({
|||||||| parent of 0b3b725 (fix: folder name):src/app/chat/_components/ChatWrapper.tsx
export default function ChatWrapper({
========
export default function CardWrapper({
>>>>>>>> 0b3b725 (fix: folder name):src/app/game-room-list/_components/CardWrapper.tsx
  leftside,
  rightside,
}: {
  leftside: React.ReactNode;
  rightside: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full min-w-[400px] max-w-[900px] flex-col overflow-hidden rounded-lg border-2 border-stroke  bg-background lg:h-[600px] lg:flex-row">
      <div className="flex w-full bg-main p-4 lg:min-h-full">{leftside}</div>
      <div className="flex w-full p-4 lg:min-h-full">{rightside}</div>
    </div>
  );
}