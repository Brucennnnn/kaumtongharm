export default function ChatWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex max-h-[600px] max-w-[900px] overflow-hidden rounded-lg border-2 border-stroke bg-background p-4 lg:min-h-[600px] lg:min-w-[900px] lg:flex-row">
      {children}
    </div>
  );
}
