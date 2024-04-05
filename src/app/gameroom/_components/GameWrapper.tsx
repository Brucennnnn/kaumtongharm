'use client';
import ProfileCard from './ProfileCard';
import type { RouterOutputs } from '@ktm/trpc/react';

type me = NonNullable<RouterOutputs['auth']['me']>;
export default function GameWrapper({
  leftside,
  rightside,
  me: me,
}: {
  leftside: React.ReactNode;
  rightside: React.ReactNode;
  me: me;
}) {
  return (
    <div className="flex flex-col  items-center min-w-[360px] w-full max-w-[500px] lg:max-w-[900px] gap-2 m-2 lg:m-0">
      <div className="w-full flex justify-center lg:justify-end">
        <ProfileCard name={me.username} roomId={me.chat?.id} />
      </div>
      <div className="scroll  flex h-full min-w-full min-h-[600px]  lg:min-w-[900px]  lg:max-w-[900px] flex-col overflow-hidden rounded-lg border-2 border-stroke  bg-background shadow-card lg:max-h-[600px]  lg:flex-row">
        <div className="flex lg:flex-1 bg-main p-4  min-h-full ">{leftside}</div>
        <div className="flex flex-1 p-4  min-h-full">{rightside}</div>
      </div>
    </div>
  );
}
