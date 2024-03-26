"use client";
import ChatWrapper from "./_components/ChatWrapper";
import LeftSideRoomList from "./_components/LeftSideRoomList";
export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <ChatWrapper
        leftside={<LeftSideRoomList />}
        rightside={<div>bruce</div>}
      ></ChatWrapper>
    </div>
  );
}
