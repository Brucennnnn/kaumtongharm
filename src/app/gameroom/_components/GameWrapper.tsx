export default function GameWrapper({
  leftside,
  rightside,
}: {
  leftside: React.ReactNode;
  rightside: React.ReactNode;
}) {
  return (
    <div className="scroll flex h-full w-full min-w-80 max-w-[900px] flex-col overflow-hidden rounded-lg border-2 border-stroke bg-background shadow-card lg:max-h-[600px] lg:flex-row">
      <div className="flex h-full min-h-[250px] w-full bg-main p-4 lg:max-h-full lg:max-w-[440px]">
        {leftside}
      </div>
      <div className="flex w-full p-4 lg:min-h-full">{rightside}</div>
    </div>
  );
}
