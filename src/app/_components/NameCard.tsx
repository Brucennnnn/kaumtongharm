import { cn } from "@ktm/lib/utils";
import { Button } from "@ktm/components/ui/button";
export default function NameCard({
  isMe,
  Name,
}: {
  isMe: boolean;
  Name: string;
}) {
  return (
    <Button
      className={cn(
        "shadow-button flex flex h-fit w-full min-w-[372px] justify-start",
        isMe ? "bg-lightpink" : "bg-roombg",
      )}
    >
      <div className="h4 font-bold text-stroke">{Name}</div>
    </Button>
  );
}
