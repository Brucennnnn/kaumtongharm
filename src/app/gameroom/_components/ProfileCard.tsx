'use client';
import { Button } from '@ktm/components/ui/button';
import { useState } from 'react';
import { Dialog, DialogContent } from '@ktm/components/ui/dialog';
import { Form, FormControl, FormField, FormItem } from '@ktm/components/ui/form';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from '@ktm/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { api } from '@ktm/trpc/react';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import LogoutButton from '@ktm/app/_components/LogoutButton';
const formSchema = z.object({
  username: z.string().min(4).max(12),
});

export default function ProfileCard({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const updateProfile = api.user.updateProfile.useMutation();
  const utils = api.useUtils();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: name,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updateProfile.mutateAsync({
      username: values.username,
    });
    await utils.auth.me.invalidate();
    setOpen(false);
  }

  return (
    <>
      <div className="flex h-fit lg:max-w-[360px] justify-between items-center rounded-md border-2 w-full border-stroke bg-main p-2 shadow-box ">
        <div className="p-1 text-xl font-bold text-stroke flex items-center h-fit">{name}</div>
        <div className=" space-x-2 flex flex-row">
          <Button
            className=" rounded-full p-3 border border-stroke bg-secondary-default  text-lg font-bold text-stroke shadow-button m-0 hover:bg-secondary-hover focus:bg-secondary-click"
            onClick={() => setOpen(true)}
          >
            <FontAwesomeIcon icon={faSliders} className=" self-center text-2xl text-stroke" width="16" />
          </Button>
          <LogoutButton />
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="h-fit w-[417px] rounded-xl bg-main p-0 shadow-box">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 p-3">
              <div className="flex w-full flex-row gap-3 py-3">
                <FontAwesomeIcon icon={faCircleUser} className="h-fit text-error" width="30" />
                <div className="text-2xl font-bold text-error">Edit Profile</div>
              </div>
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
                  </FormItem>
                )}
              />
              <div className="flex w-full justify-center gap-4 py-1">
                <Button
                  className="w-fit min-w-[90px] rounded-md  bg-secondary-default hover:bg-secondary-hover focus:bg-secondary-click p-3 text-md font-bold text-stroke shadow-button"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-fit min-w-[90px] rounded-md  bg-yellow-default hover:bg-yellow-hover focus:bg-yellow-click p-3 text-md font-bold text-stroke shadow-button"
                >
                  Confirm
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
