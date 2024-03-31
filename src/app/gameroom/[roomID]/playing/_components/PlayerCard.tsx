"use client";
import { cn } from "@ktm/lib/utils";
import { Button } from "@ktm/components/ui/button";
import { useState } from "react";
export default function PlayerCard({
  isAlive,
  Name,
  Score,
  Word,
}: {
  isAlive: boolean;
  Name: string;
  Score: number;
  Word: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Button
      className={cn(
        "flex h-fit w-full min-w-[372px] justify-between",
        isAlive
          ? "shadow-button hover:shodow-none bg-roombg  hover:bg-error hover:shadow-none"
          : "cursor-not-allowed bg-roombg opacity-50",
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
            <div className="h4 font-bold text-stroke">{Name}</div>
            {isAlive && (
              <div className="h4 font-bold text-error">({Score})</div>
            )}
          </div>
          <div className="h4 font-bold text-stroke">{Word}</div>
        </>
      )}
    </Button>
  );
}
