"use client";
import { useEffect } from "react";
import { api } from "@ktm/trpc/react";
export default function GameRoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const exitChat = api.chat.exitChat.useMutation();
  useEffect(() => {
    const beforeUnload = (event: BeforeUnloadEvent) => {
      exitChat.mutate();
      event.preventDefault();
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  });
  return children;
}
