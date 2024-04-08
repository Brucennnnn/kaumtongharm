import { env } from '@ktm/env';
import Pusher from 'pusher';

export const pusher = new Pusher({
  appId: env.PUSHER_APP_ID,
  key: '5267da243e2e668ba3cc',
  secret: env.PUSHER_SECRET,
  cluster: 'ap1',
  useTLS: true,
});
