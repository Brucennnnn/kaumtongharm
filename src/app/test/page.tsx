"use client";
import { validateRequest } from "@ktm/server/api/auth";
import { api } from "@ktm/trpc/react";

export default function Page() {
  const user = api.auth.me.useQuery();
  if (user.isSuccess && !user.data) {
    console.log("this user", user);
  }

  const { data, isSuccess } = api.kaumTongHarm.getAll.useQuery();
  const randomWord = api.kaumTongHarm.getRamdom.useQuery({ take: 5 });

  console.log(randomWord.data);
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
      <GameRoomList allRooms={[room1, room2]} />
    </>
  );
}
