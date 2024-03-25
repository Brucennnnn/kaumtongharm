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
    <div>
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign up</TabsTrigger>
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
