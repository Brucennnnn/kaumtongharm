export default function ChatWrapper({
  leftside,
  rightside,
}: {
  leftside: React.ReactNode;
  rightside: React.ReactNode;
}) {
  return (
    <div className="flex max-h-[600px] min-h-[600px] w-[400px] max-w-[900px] flex-col overflow-hidden rounded-lg border-2 border-stroke bg-background  lg:min-w-[900px] lg:flex-row">
      <div className="flex h-auto w-full bg-main p-4">{leftside}</div>
      <div className="flex h-auto w-full p-4">{rightside}</div>
    </div>
  );
}
