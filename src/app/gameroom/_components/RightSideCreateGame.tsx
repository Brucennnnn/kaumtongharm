"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "@ktm/trpc/react";
import { z } from "zod";

import { Button } from "@ktm/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ktm/components/ui/form";
import { Input } from "@ktm/components/ui/input";

const formSchema = z.object({
  title: z.string().min(1),
  maxPlayers: z.coerce.number().min(1),
  rounds: z.coerce.number().min(1),
  description: z.string().min(1).max(128),
});

export default function RightSideCreateGame() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "Default",
      maxPlayers: 1,
      rounds: 1,
      description: "Hello",
    },
  });

  const createGameRoom = api.game.createGameRoom.useMutation();

  function onSubmit(values: z.infer<typeof formSchema>) {
    createGameRoom.mutate({
      description: values.description,
      title: values.title,
      maxPlayers: values.maxPlayers,
      rounds: values.rounds,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxPlayers"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="max" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rounds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="round" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
