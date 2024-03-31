"use client";
import { cn } from "@ktm/lib/utils";
import { Button } from "@ktm/components/ui/button";
import { useState } from "react";
export default function PlayerCard({
  isAlive,
  name,
  point,
  word,
}: {
  isAlive: boolean;
  name: string;
  point: number;
  word: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Button
      className={cn(
        "flex h-fit w-full min-w-[200px] justify-between",
        isAlive
          ? "hover:shodow-none bg-roombg shadow-button  hover:bg-error hover:shadow-none"
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
            <div className="h4 font-bold text-stroke">{name}</div>
            {isAlive && (
              <div className="h4 font-bold text-error">({point})</div>
            )}
          </div>
          <div className="h4 font-bold text-stroke">{word}</div>
        </>
      )}
    </Button>
  );
}
