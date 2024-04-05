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
    <div className="flex flex-col  items-center w-fit gap-2 ">
      <div className="w-full flex justify-center lg:justify-end">
        <ProfileCard name={me.username} />
      </div>
      <div className="scroll  flex h-full min-h-[600px] w-full lg:min-w-[900px] max-w-[500px] lg:max-w-[900px] flex-col overflow-hidden rounded-lg border-2 border-stroke  bg-background shadow-card lg:max-h-[600px]  lg:flex-row">
        <div className="flex flex-1 min-h-[250px] w-full bg-main p-4 lg:min-h-full ">{leftside}</div>
        <div className="flex flex-1 w-full p-4 h-fit lg:min-h-full">{rightside}</div>
      </div>
    </div>
  );
}
