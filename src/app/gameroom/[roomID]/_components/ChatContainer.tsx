"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@ktm/components/ui/button";
import { socket } from "@ktm/action/socket";
import { type ZodType, z } from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@ktm/components/ui/form";
import { Input } from "@ktm/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { type RouterOutputs, api } from "@ktm/trpc/react";
import { redirect } from "next/navigation";
import { toast } from "@ktm/components/ui/use-toast";

type ChatMessage = {
  username: string;
  message: string;
  isPrivate?: boolean;
};

type MessageType = {
  sender: string;
  message: string;
};

type MessagePrivateType = {
  sender: string;
  senderId: string;
  receiver: string;
  receiverId: string;
  message: string;
};

type ChatProps = {
  roomsChannel: string;
  gameRoom: NonNullable<RouterOutputs["gameRoom"]["getGameRoom"]>;
};

function detectCommand(message: string) {
  const command = message.split(" ")[0];
  if (!command || !command.startsWith("/"))
    return { command: "", receiver: "", message };
  const [receiver, ...args] = message.split(" ").slice(1);
  return { command, receiver, message: args.join(" ") };
}

export function ChatContainer(props: ChatProps) {
  const { roomsChannel, gameRoom } = props;
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const { isSuccess, data } = api.auth.me.useQuery(undefined, {});

  if (isSuccess && !data) {
    redirect("/login");
  }

  const chatSchema: ZodType<ChatMessage> = z.object({
    username: z.string(),
    message: z.string().min(1),
  });

  const chatForm = useForm<ChatMessage>({
    resolver: zodResolver(chatSchema),
    defaultValues: {
      username: "",
      message: "",
    },
  });

  useEffect(() => {
    socket.on(
      `private-channel-${roomsChannel}`,
      (message: MessagePrivateType) => {
        if (data?.id === message.senderId || data?.id === message.receiverId)
          setChats((prevState) => [
            ...prevState,
            {
              username: message.sender ?? "Unknown",
              message: message.message,
              isPrivate: true,
            },
          ]);
      },
    );
    socket.on(`public-channel-${roomsChannel}`, (message: MessageType) => {
      setChats((prevState) => [
        ...prevState,
        { username: message.sender ?? "Unknown", message: message.message },
      ]);
    });
    return () => {
      socket.off(`private-channel-${roomsChannel}`);
      socket.off(`public-channel-${roomsChannel}`);
    };
  }, [data, roomsChannel]);

  useEffect(() => {
    scrollingBottom();
  }, [chats]);

  const { handleSubmit, register, resetField } = chatForm;

  const targetElement = useRef<HTMLDivElement | null>(null);
  const scrollingBottom = () => {
    targetElement.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const onSubmit: SubmitHandler<ChatMessage> = async (value) => {
    const { command, receiver, message } = detectCommand(value.message);
    resetField("message");
    const users = gameRoom.chat?.User ?? [];
    const receiverId = users.find((user) => user.username === receiver)?.id;

    if (command === "/msg") {
      if (!receiverId) {
        return toast({
          title: "Error",
          variant: "default",
          description: (
            <div>
              <span>Receiver not found</span>
            </div>
          ),
        });
      }

      socket.emit("private-message", {
        channel: `private-channel-${roomsChannel}`,
        sender: data?.username ?? "Unknown",
        senderId: data?.id ?? "",
        receiver,
        receiverId,
        message,
      });
      return;
    }

    socket.emit("public-message", {
      channel: `public-channel-${roomsChannel}`,
      sender: data?.username ?? "Unknown",
      message: message,
    });
  };

  return (
    <div className="flex w-full flex-col justify-between gap-2">
      <div className="flex h-full flex-col gap-2 overflow-y-scroll">
        {chats.map((chat, index) => {
          if (chat.isPrivate) {
            return (
              <div
                key={index}
                className="flex flex-col gap-1 rounded-xl bg-secondary p-2"
              >
                <h5 className="text-xl font-bold text-stroke">{`${chat.username} (private) :`}</h5>
                <p className="pl-1 text-base font-bold text-error">
                  {chat.message}
                </p>
              </div>
            );
          }
          return (
            <div key={index} className="flex flex-col gap-1 p-2">
              <h5 className="text-xl font-bold text-stroke">
                {chat.username} :
              </h5>
              <p className="pl-1 text-base font-bold">{chat.message}</p>
            </div>
          );
        })}
        <div className="flex h-10" />
        <div ref={targetElement} />
      </div>

      <Form {...chatForm}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full gap-3 rounded-3xl bg-main px-4 py-3"
        >
          <Input
            className="w-full border-none bg-main p-0 text-base font-bold placeholder:text-background"
            placeholder="Typing..."
            {...register("message")}
          />
          <Button type="submit" className="p-0">
            <FontAwesomeIcon icon={faPaperPlane} className="w-4 text-[#fff]" />
          </Button>
        </form>
      </Form>
    </div>
  );
}
