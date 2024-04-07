'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { api } from '@ktm/trpc/react';
import { z } from 'zod';
import { Textarea } from '@ktm/components/ui/textarea';

import { Button } from '@ktm/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@ktm/components/ui/form';
import { Input } from '@ktm/components/ui/input';
import { useRouter } from 'next/navigation';
import { toast } from '@ktm/components/ui/use-toast';
import * as React from 'react';

const formSchema = z.object({
  roomName: z.string().min(1).max(20),
  maxPlayers: z.coerce.number().min(3).max(20),
  rounds: z.coerce.number().min(1).max(20),
  description: z.string().max(128),
});

export default function RightSideCreateGame() {
  function filterNumbers(inputString: string): string {
    const numbers: string[] = inputString.match(/\d/g) ?? [];
    const filteredNumbers: string = numbers.join('');
    return filteredNumbers;
  }
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomName: '',
      maxPlayers: 3,
      rounds: 1,
      description: '',
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
      return toast({
        title: 'Error',
        variant: 'default',
        description: <div>something went wrong</div>,
      });
    }
  }

  return (
    <div className=" flex h-full w-full flex-col justify-between">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-fit w-full space-y-2 rounded-2xl  bg-main p-3 shadow-card"
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
                <FormMessage className="text-error" />
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
                        min="0"
                        className="w-full rounded-md border-none bg-background p-0 text-base text-stroke focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                        value={filterNumbers(form.getValues('maxPlayers').toString())}
                      />
                    </FormControl>
                  </div>
                </FormControl>
                <FormMessage className="text-error" />
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
                        step="1"
                        min="0"
                        className="w-full rounded-md border-none bg-background p-0 text-base text-stroke focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                        value={filterNumbers(form.getValues('rounds').toString())}
                      />
                    </FormControl>
                  </div>
                </FormControl>

                <FormMessage className="text-error" />
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
                <FormMessage className="text-error" />
              </FormItem>
            )}
          />
          <div className="flex w-full justify-end p-1">
            <Button
              type="submit"
              className="w-[102px] secondary rounded-md border-2 border-stroke bg-pending p-3 text-base font-bold text-stroke shadow-button"
            >
              Create
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
