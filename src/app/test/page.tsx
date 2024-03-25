import { signup } from "@ktm/action/auth";
import { validateRequest } from "@ktm/server/api/auth";
export default async function Page() {
  const { user } = await validateRequest();
  if (user) {
    console.log("this user", user);
  }
  return (
    <>
      <h1>Create an account</h1>
      {/* <form action={signup}> */}
      {/*   <label htmlFor="username">Username</label> */}
      {/*   <input name="username" id="username" /> */}
      {/*   <br /> */}
      {/*   <label htmlFor="password">Password</label> */}
      {/*   <input type="password" name="password" id="password" /> */}
      {/*   <br /> */}
      {/*   <button>Continue</button> */}
      {/* </form> */}
    </>
  );
}
