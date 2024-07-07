"use client";
import React from "react";

import { io, Socket } from "socket.io-client";

import { useCodeRunning } from "@/store/hooks/useCodingRunning";

import ArenaNavBar from "@/components/ArenaNavbar";
import ArenaQuestion from "@/components/ArenaQuestion";
import ArenaEditor from "@/components/ArenaEditor";

export default function Arena() {
  const [codeOutput, setcodeOutput] = React.useState<string>("");
  const [socket, setSocket] = React.useState<Socket | null>(null);
  const [_, setRunning] = useCodeRunning();

  React.useEffect(() => {
    const socket = io("http://localhost:8080");

    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("joined", 1);
    });

    socket.on("submission", (data: any) => {
      console.log("Submission received: ", data);
      setRunning(false);
      setcodeOutput(data.stdout);
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });

    setSocket(socket);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      socket.close();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <main className="px-6">
      <ArenaNavBar player1="NotTheRightGuy" player2="Meow189" />
      <div className="flex gap-2">
        <ArenaQuestion question_name="Bob in Alice" question_slug="BOBIAL" />
        <ArenaEditor socket={socket as Socket} stdout={codeOutput} />
      </div>
    </main>
  );
}
