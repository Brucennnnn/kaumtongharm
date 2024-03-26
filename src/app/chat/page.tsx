"use client";
import { type Channel } from "pusher-js";
import { usePusher } from "@ktm/app/_context/PusherContext";
import { api } from "@ktm/trpc/react";
import { redirect } from "next/navigation";
import { Button } from "@ktm/components/ui/button";
import { useEffect } from "react";
export default function Page() {
  const { isSuccess, data } = api.auth.me.useQuery(undefined, {});

  if (isSuccess && !data) {
    redirect("/login");
  }

  let chatChannel: Channel | null = null;
  const pusher = usePusher();

  chatChannel = pusher.subscribe(`chat-1`);
  useEffect(() => {
    if (isSuccess) {
      chatChannel.bind("test", (data: string) => {
        console.log(data);
      });
    }
    return () => {
      chatChannel.unbind_all();
    };
  }, [isSuccess, data, chatChannel]);

  const sendChat = api.chat.sendChatMessage.useMutation();
  const onClickHello = () => {
    sendChat.mutate({
      message: "hello",
    });
  };

  return (
    <div>
      <Button onClick={onClickHello}>Pusher</Button>
    </div>
  );
}
