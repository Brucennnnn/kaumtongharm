"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@ktm/components/ui/button";
import { Input } from "@ktm/components/ui/input";
import { Textarea } from "@ktm/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@ktm/components/ui/form";

const formSchema = z.object({
  roomName: z.string().min(1),
  maxPlayer: z.coerce.number().min(3),
  round: z.coerce.number().min(1),
  detail: z.string().min(10).max(200),
});
function onSubmit(data: z.infer<typeof formSchema>) {
  console.log(data);
}
export default function CreateGame() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  return (
    <div className="h-fit w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-fit w-full min-w-[400px] space-y-2 rounded-2xl bg-main p-3 shadow-card"
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
            name="maxPlayer"
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
            name="round"
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
            name="detail"
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
              className="w-[102px] rounded-md border-stroke bg-pending p-3 text-base font-bold text-stroke shadow-button"
            >
              Create
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
