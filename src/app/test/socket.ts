"use client";

import { io } from "socket.io-client";

export const socket = io("http://localhost:3005", {
	transports: ["websocket"],
});
console.log("connecting");
socket.connect();
