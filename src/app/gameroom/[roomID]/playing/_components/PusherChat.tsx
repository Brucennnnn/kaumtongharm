'use client';

import { usePusher } from '@ktm/app/_context/PusherContext';
import { api } from '@ktm/trpc/react';
import { redirect } from 'next/navigation';
import { Button } from '@ktm/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Input } from '@ktm/components/ui/input';
import { useForm } from 'react-hook-form';
import { type ZodType, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SubmitHandler } from 'react-hook-form';
import { Form } from '@ktm/components/ui/form';

type ChatMessage = {
  username: string;
  message: string;
};

export default function Chat({ params }: { params: { chatID: string } }) {
  const { isSuccess, data } = api.auth.me.useQuery(undefined, {});
  const [chats, setChats] = useState<ChatMessage[]>([]);

  if (isSuccess && !data) {
    redirect('/login');
  }

  const chatSchema: ZodType<ChatMessage> = z.object({
    username: z.string(),
    message: z.string().min(1),
  });

  const chatForm = useForm<ChatMessage>({
    resolver: zodResolver(chatSchema),
    defaultValues: {
      username: '',
      message: '',
    },
  });

  const pusher = usePusher();
  const chatChannel = pusher.subscribe(`chat-${params.chatID}`);

  useEffect(() => {
    if (isSuccess) {
      chatChannel.bind('test', (data: ChatMessage) => {
        const { username, message } = data;
        setChats((prevState) => [...prevState, { username, message }]);
      });
    }
    scrollingBottom();
    return () => {
      chatChannel.unbind_all();
    };
  }, [isSuccess, chatChannel]);

  const { handleSubmit, register, resetField } = chatForm;

  const targetElement = useRef<HTMLDivElement | null>(null);
  const scrollingBottom = () => {
    targetElement.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const sendChat = api.chat.sendChatMessage.useMutation();
  const onSubmit: SubmitHandler<ChatMessage> = async (value) => {
    sendChat.mutate({
      username: data?.username ?? 'Unknown',
      message: value.message,
    });
    resetField('message');
  };

  return (
    <div className="overflowAnchor-auto flex w-full flex-1 flex-col justify-between gap-2">
      <div className="flex flex-col gap-2 overflow-y-scroll text-stroke">
        {chats.map((chat, index) => (
          <div key={index} className="flex flex-col gap-1 p-2">
            <h5 className="text-xl font-bold text-stroke">{chat.username} :</h5>
            <p className="pl-1 text-base font-bold">{chat.message}</p>
          </div>
        ))}
        <div className="flex lg:min:h-full flex-1" />
        <div ref={targetElement} />
      </div>

      <Form {...chatForm}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full gap-3 rounded-3xl bg-main px-4 py-3">
          <Input
            className="w-full border-none bg-main p-0 text-base font-bold placeholder:text-background"
            placeholder="Typing..."
            {...register('message')}
          />
          <Button type="submit" className="p-0">
            <FontAwesomeIcon icon={faPaperPlane} className="w-4 text-[#fff]" />
          </Button>
        </form>
      </Form>
    </div>
  );
}
