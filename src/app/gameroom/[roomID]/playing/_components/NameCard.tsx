import { cn } from "@ktm/lib/utils";
import { Button } from "@ktm/components/ui/button";
export default function NameCard({
  isMe,
  name,
}: {
  isMe: boolean;
  name: string;
}) {
  return (
    <Button
      className={cn(
        "flex h-fit w-full min-w-[372px] justify-start shadow-button",
        isMe ? "bg-lightpink" : "bg-roombg",
      )}
    >
      <div className="h4 font-bold text-stroke">{name}</div>
    </Button>
  );
}
