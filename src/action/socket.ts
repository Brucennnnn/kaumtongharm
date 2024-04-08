'use client';
import { env } from '@ktm/env';

import { io } from 'socket.io-client';

export const socket = io(env.SOCKET_API, {
  transports: ['websocket'],
});
socket.connect();
