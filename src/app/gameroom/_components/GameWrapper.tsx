export default function GameWrapper({
  leftside,
  rightside,
}: {
  leftside: React.ReactNode;
  rightside: React.ReactNode;
}) {
  return (
    <div className="scroll m-4 flex h-full min-h-[600px] w-full min-w-80 max-w-[600px] flex-col overflow-hidden rounded-lg border-2 border-stroke bg-background shadow-card lg:max-h-[600px] lg:max-w-[900px] lg:flex-row">
      <div className="flex  min-h-[250px] w-full bg-main p-4 lg:min-h-full lg:max-w-[440px]">
        {leftside}
      </div>
      <div className="flex w-full p-4 lg:min-h-full">{rightside}</div>
    </div>
  );
}
