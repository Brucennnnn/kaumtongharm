"use client";
import { useEffect } from "react";
import { api } from "@ktm/trpc/react";
export default function GameRoomLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { roomId: string };
}) {
  const joinChat = api.gameRoom.joinGameRoom.useMutation();
  useEffect(() => {
    joinChat.mutate({ roomId: parseInt(params.roomId) });
  }, [params.roomId]);

  const exitChat = api.chat.exitChat.useMutation();
  useEffect(() => {
    const beforeUnload = (event: BeforeUnloadEvent) => {
      exitChat.mutate({ roomId: parseInt(params.roomId) });
      event.preventDefault();
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  });
  return children;
}
