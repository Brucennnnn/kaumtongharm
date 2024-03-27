import { cn } from "@ktm/lib/utils";
import { Button } from "@ktm/components/ui/button";
export default function RoomCard() {
  const isAvaliable = true;
  const isSelect = true;
  return (
    <Button
      className={cn(
        "flex h-fit w-full justify-between ",
        isSelect ? "bg-hardpink" : "bg-roombg",
      )}
    >
      <div className="flex">
        <div className="h4 font-bold text-stroke">This is Room Name</div>
        <div
          className={cn(
            "h5 w-fit",
            isAvaliable ? "text-success" : "text-error",
          )}
        >
          Avaliable
        </div>
      </div>
      <div className="h4 font-bold text-stroke">5/10</div>
    </Button>
  );
}
