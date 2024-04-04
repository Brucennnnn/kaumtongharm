'use client';
import { useEffect } from 'react';
import { api } from '@ktm/trpc/react';
import { useRouter } from 'next/navigation';
export default function GameRoomLayout({ children }: { children: React.ReactNode }) {
  const me = api.auth.me.useQuery();

  const router = useRouter();
  useEffect(() => {
    if (me.isSuccess && !me.data) {
      router.push('/login');
    }
  }, [me.isSuccess, me.data]);
  return children;
}
