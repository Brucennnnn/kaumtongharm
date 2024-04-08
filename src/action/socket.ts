'use client';
import { env } from '@ktm/env';

import { io } from 'socket.io-client';

export const socket = io(env.NEXT_PUBLIC_SOCKET_API, {
  transports: ['polling'],
});
socket.connect();
