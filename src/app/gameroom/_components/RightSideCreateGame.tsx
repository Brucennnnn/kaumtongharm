"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "@ktm/trpc/react";
import { z } from "zod";
import { Textarea } from "@ktm/components/ui/textarea";

import { Button } from "@ktm/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@ktm/components/ui/form";
import { Input } from "@ktm/components/ui/input";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  roomName: z.string().min(1),
  maxPlayers: z.coerce.number().min(3),
  rounds: z.coerce.number().min(1),
  description: z.string().min(1).max(128),
});

export default function RightSideCreateGame() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomName: "",
      maxPlayers: 1,
      rounds: 1,
      description: "",
    },
  });

  const createGameRoom = api.gameRoom.createGameRoom.useMutation();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const data = await createGameRoom.mutateAsync({
        description: values.description,
        roomName: values.roomName,
        maxPlayers: values.maxPlayers,
        rounds: values.rounds,
      });
      router.push(`gameroom/${data.id}`);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Something went wrong.");
      }
    }
  }

  return (
    <div className="h-fit w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-fit w-full space-y-2 rounded-2xl border-2 border-stroke bg-main p-3 shadow-card"
        >
          <FormField
            control={form.control}
            name="roomName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex w-full flex-row items-center justify-center gap-2 rounded-md bg-background px-2 text-base font-bold text-stroke">
                    <span>Room Name:</span>
                    <FormControl className="flex-1">
                      <Input
                        type="text"
                        className="w-full rounded-md border-none bg-background p-0 text-base text-stroke focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxPlayers"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex w-full flex-row items-center justify-center gap-2 rounded-md bg-background px-2 text-base font-bold text-stroke">
                    <span>Max players:</span>
                    <FormControl className="flex-1">
                      <Input
                        type="number"
                        className="w-full rounded-md border-none bg-background p-0 text-base text-stroke focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rounds"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex w-full flex-row items-center justify-center gap-2 rounded-md bg-background px-2 py-0 text-base font-bold text-stroke">
                    <span>Round Numbers:</span>
                    <FormControl className="flex-1">
                      <Input
                        type="number"
                        className="w-full rounded-md border-none bg-background p-0 text-base text-stroke focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex w-full flex-row items-center justify-center gap-2 rounded-md bg-background p-2 text-base  font-bold text-stroke">
                    <FormControl>
                      <Textarea
                        placeholder="Detail"
                        className="resize-none rounded-md border-none bg-background p-0  text-base text-stroke focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex w-full justify-end p-1">
            <Button
              type="submit"
              className="w-[102px] rounded-md border-2 border-stroke bg-pending p-3 text-base font-bold text-stroke shadow-button"
            >
              Create
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
