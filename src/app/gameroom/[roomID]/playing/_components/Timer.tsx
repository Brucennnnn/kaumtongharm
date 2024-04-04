'use client';
import { useEffect, useState } from 'react';
import { Dayjs } from '@ktm/utils/dayjs';
import { cn } from '@ktm/lib/utils';
export default function Timer({ deadline, className }: { deadline: string; className?: string }) {
  return (
    <div
      className={cn(
        'flex w-full items-center justify-center rounded-md bg-background p-2 font-bold text-stroke',
        className,
      )}
    >
      {deadline}
    </div>
  );
}
