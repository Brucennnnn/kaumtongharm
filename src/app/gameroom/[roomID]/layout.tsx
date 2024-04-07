'use client';
import { useEffect } from 'react';
import { api } from '@ktm/trpc/react';
export default function GameRoomLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { roomID: string };
}) {
  const { isSuccess, data } = api.auth.me.useQuery(undefined, {});
  // const joinChat = api.gameRoom.joinGameRoom.useMutation();
  // useEffect(() => {
  // 	if (isSuccess) {
  // 		joinChat.mutate({
  // 			roomId: parseInt(params.roomID),
  // 			username: data?.username ?? "Unknown",
  // 		});
  // 	}
  // }, [params.roomID]);

  const exitChat = api.chat.exitChat.useMutation();
  useEffect(() => {
    const beforeUnload = (event: BeforeUnloadEvent) => {
      exitChat.mutate({
        roomId: parseInt(params.roomID),
        username: data?.username ?? 'Unknown',
      });
      event.preventDefault();
    };
    window.addEventListener('beforeunload', beforeUnload);
    return () => {
      window.removeEventListener('beforeunload', beforeUnload);
    };
  });
  return children;
}
