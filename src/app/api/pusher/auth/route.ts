import { validateRequest } from '@ktm/server/api/auth';
import { pusher } from '@ktm/server/pusher/pusher';
import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';

const pusherAuthDTO = z.object({
  channel_name: z.string(),
  socket_id: z.string(),
});

export async function POST(req: NextRequest) {
  const { session } = await validateRequest();

  if (!session) {
    return NextResponse.json(
      {
        message: 'Unauthorized',
      },
      {
        status: 401,
      },
    );
  }

  const userID = session.userId;

  const formdata = await req.formData();
  const { channel_name, socket_id } = pusherAuthDTO.parse({
    channel_name: formdata.get('channel_name'),
    socket_id: formdata.get('socket_id'),
  });

  if (channel_name === `private-user-${userID}`) {
    const authorizedResponse = pusher.authorizeChannel(socket_id, channel_name);
    return NextResponse.json(authorizedResponse);
  }
}
