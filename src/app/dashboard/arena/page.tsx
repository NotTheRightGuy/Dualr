"use client";

import React from "react";
import { io, Socket } from "socket.io-client";
import { useCodeRunning } from "@/store/hooks/useCodingRunning";
import ArenaNavBar from "@/components/ArenaNavbar";
import ArenaQuestion from "@/components/ArenaQuestion";
import ArenaEditor from "@/components/ArenaEditor";
import { useQuestion } from "@/store/hooks/useQuestion";

export default function Arena() {
  const [codeOutput, setcodeOutput] = React.useState<string>("");
  const [socket, setSocket] = React.useState<Socket | null>(null);
  const [_, setRunning] = useCodeRunning();
  const [question, setQuestion] = useQuestion();

  React.useEffect(() => {
    const socket = io("http://localhost:8080");

    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("joined", 1); //! Change this to the user id
    });

    socket.on("submission", (data: any) => {
      console.log("Submission received: ", data);
      setRunning(false);
      setcodeOutput(data);
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

  React.useEffect(() => {
    fetch("http://localhost:8080/dual/request").then((res) => {
      res.json().then((data) => {
        setQuestion(data);
      });
    });
  }, []);

  return (
    <main className="px-6">
      <ArenaNavBar player1="NotTheRightGuy" player2="Meow189" />
      <div className="flex gap-2">
        <ArenaQuestion />
        <ArenaEditor output={codeOutput} />
      </div>
    </main>
  );
}
