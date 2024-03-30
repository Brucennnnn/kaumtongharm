export default function GameWrapper({
  leftside,
  rightside,
}: {
  leftside: React.ReactNode;
  rightside: React.ReactNode;
}) {
  return (
    <div className="flex max-h-[600px] min-h-[600px] w-[400px] max-w-[900px] flex-col overflow-hidden rounded-lg border-2 border-stroke bg-background  lg:min-w-[900px] lg:flex-row">
      <div className="flex w-full bg-main p-4 lg:min-h-full">{leftside}</div>
      <div className="flex w-full p-4 lg:min-h-full">{rightside}</div>
    </div>
  );
}
