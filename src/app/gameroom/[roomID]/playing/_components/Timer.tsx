"use client";
import { useEffect, useState } from "react";
import { Dayjs } from "@ktm/utils/dayjs";
import { cn } from "@ktm/lib/utils";
export default function Timer({
  deadline,
  className,
}: {
  deadline: number;
  className?: string;
}) {
  const [timeLeft, setTimeLeft] = useState("04:00");
  useEffect(() => {
    const timeDiff = deadline - Date.now();
    const interval = setInterval(() => {
      if (timeDiff > 0) {
        setTimeLeft(Dayjs(timeDiff).format("mm:ss"));
      } else {
        setTimeLeft("00:00");
      }
    }, 1000);

    return () => clearInterval(interval);
  });
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center rounded-md bg-background p-2 font-bold text-stroke",
        className,
      )}
    >
      {timeLeft}
    </div>
  );
}
