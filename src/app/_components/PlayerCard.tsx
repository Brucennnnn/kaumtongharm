"use client";
import { cn } from "@ktm/lib/utils";
import { Button } from "@ktm/components/ui/button";
import { useState } from "react";
export default function PlayerCard() {
  const [isHovered, setIsHovered] = useState(false);
  const isAlive = true;
  return (
    <Button
      className={cn(
        "flex h-fit w-[372px] justify-between",
        isAlive
          ? "border-b border-b-[3px] border-r border-r-[3px] bg-roombg"
          : "cursor-not-allowed bg-roombg opacity-50",
        {
          "border-none hover:bg-error": isAlive && isHovered,
        },
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isAlive && isHovered ? (
        <div className="flex w-full items-center justify-center">
          <div className="h4 font-bold text-background">Vote</div>
        </div>
      ) : (
        <>
          <div className="flex flex-row gap-2">
            <div className="h4 font-bold text-stroke">Player 1</div>
            {isAlive && <div className="h4 font-bold text-error">(5)</div>}
          </div>
          <div className="h4 font-bold text-stroke">แฟน</div>
        </>
      )}
    </Button>
  );
}
