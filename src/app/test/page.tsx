"use client";
import { socket } from "./socket";
import { Button } from "@ktm/components/ui/button";
import { useState, useEffect } from "react";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);

  function handlePing() {
    socket.emit("message", "ping", (val) => {
      console.log(val);
    });
  }
  console.log("client side", socket.connected);
  useEffect(() => {
    console.log(socket.connected);
    if (socket.connected) {
      console.log("hi");
      setIsConnected(true);
    }
    socket.on("connected", () => {
      socket.emit("message", { mello: "bruce" });
    });
  });
  return (
    <div>
      <Button onClick={handlePing}>Ping</Button>
    </div>
  );
}
