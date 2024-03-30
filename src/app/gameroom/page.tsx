"use client";
import GameWrapper from "./_components/GameWrapper";
import LeftSideRoomList from "./_components/LeftSideRoomList";
import RightSideCreateGame from "./_components/RightSideCreateGame";
export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <GameWrapper
        leftside={<LeftSideRoomList />}
        rightside={<RightSideCreateGame />}
      ></GameWrapper>
    </div>
  );
}
