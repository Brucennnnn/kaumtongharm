import { signup } from "@ktm/action/auth";
import { validateRequest } from "@ktm/server/api/auth";
import { type player, type gameRoom } from "../interfaces";
import GameRoomList from "../_components/GameRoomList";

const p1: player = {
  name: "Nicepun",
  score: 0,
  myWord: null,
};

const p2: player = {
  name: "Bruce",
  score: 0,
  myWord: null,
};

const p3: player = {
  name: "Kim",
  score: 0,
  myWord: null,
};

const room1: gameRoom = {
  name: "This is room1 name",
  status: 3,
  maxRound: 5,
  players: [p1, p2],
  maxPlayer: 10,
  details: "for thai people",
};

const room2: gameRoom = {
  name: "This is room2 name long long long long long long long long",
  status: 0,
  maxRound: 7,
  players: [p3],
  maxPlayer: 4,
  details: "for thai people",
};

export default async function Page() {
  // const [selectedRoom, setSelectedRoom];
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
      <GameRoomList allRooms={[room1, room2]} />
    </>
  );
}
