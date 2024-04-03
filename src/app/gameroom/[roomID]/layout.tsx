"use client";
import { useEffect } from "react";
import { api } from "@ktm/trpc/react";
export default function GameRoomLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { roomID: string };
}) {
  const joinChat = api.gameRoom.joinGameRoom.useMutation();
  useEffect(() => {
    joinChat.mutate({ roomId: parseInt(params.roomID) });
  }, [params.roomID]);

	const exitChat = api.chat.exitChat.useMutation();
	useEffect(() => {
		const beforeUnload = (event: BeforeUnloadEvent) => {
			exitChat.mutate({ roomId: parseInt(params.roomID) });
			event.preventDefault();
		};
		window.addEventListener("beforeunload", beforeUnload);
		return () => {
			window.removeEventListener("beforeunload", beforeUnload);
		};
	});
	return children;
}
