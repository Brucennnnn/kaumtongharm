'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@ktm/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@ktm/components/ui/form';
import { Input } from '@ktm/components/ui/input';
import { login } from '@ktm/action/auth';

const formSchema = z.object({
  username: z.string().min(4).max(12),
  password: z.string().min(4).max(12),
});

export default function LoginTab() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await login(values.username, values.password);
  }
  return (
    <div className="h-fit w-fit">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-3 w-auto min-w-[280px]  space-y-3 rounded-xl border-2 border-stroke bg-main p-3 lg:w-[432px]"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex w-full min-w-0 flex-row items-center justify-center gap-2 rounded-md bg-background px-2 text-xl  font-bold text-stroke">
                    <span>Username: </span>
                    <FormControl className="w-fit min-w-0 text-stroke">
                      <Input
                        type="text"
                        className="!mt-0 w-full rounded-md border-none bg-background p-0 text-xl text-stroke focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                        autoComplete="username"
                      />
                    </FormControl>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full min-w-0 flex-row items-center justify-center gap-2 rounded-md bg-background px-2 text-xl  font-bold text-stroke">
                  <span>Password: </span>
                  <FormControl className="w-fit min-w-0 text-stroke">
                    <Input
                      type="password"
                      className="!mt-0 w-full rounded-md border-none bg-background p-0 text-xl text-stroke focus-visible:ring-0 focus-visible:ring-offset-0"
                      {...field}
                      autoComplete="current-password"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className=" w-full rounded-md border border-stroke secondary p-2 text-xl font-bold text-stroke"
          >
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}
