import { cn } from "@ktm/lib/utils";
import { Button } from "@ktm/components/ui/button";
export default function NameCard() {
  const isMe = true;
  return (
    <Button
      className={cn(
        "flex flex h-fit w-[372px] justify-start border-b border-b-[3px] border-r border-r-[3px]",
        isMe ? "bg-lightpink" : "bg-roombg",
      )}
    >
      <div className="h4 font-bold text-stroke">Mejai</div>
    </Button>
  );
}
