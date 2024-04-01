import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@ktm/components/ui/tabs";
import LoginTab from "./_components/LoginTab";
import SignUpTab from "./_components/SignUpTab";
export default function Page() {
  return (
    <div className="bg-bgImage flex min-h-screen w-screen items-center justify-center bg-cover bg-center">
      <Tabs defaultValue="login" className="flex w-fit flex-col pb-10">
        <TabsList className="justify-end">
          <TabsTrigger className="data-[state=active]:bg-main" value="login">
            Login
          </TabsTrigger>
          <TabsTrigger className="data-[state=active]:bg-main" value="signup">
            Sign up
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginTab />
        </TabsContent>
        <TabsContent value="signup">
          <SignUpTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
