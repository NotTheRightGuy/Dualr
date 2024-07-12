"use client";

import React from "react";
import { io, Socket } from "socket.io-client";
import { useCodeRunning } from "@/store/hooks/useCodingRunning";
import ArenaNavBar from "@/components/ArenaNavbar";
import ArenaQuestion from "@/components/ArenaQuestion";
import ArenaEditor from "@/components/ArenaEditor";
import { useQuestion } from "@/store/hooks/useQuestion";
import { useUser } from "@/store/hooks/useUser";
import { useOpponent } from "@/store/hooks/useOpponent";
import { useSearchParams } from "next/navigation";
import makeAuthenticatedRequest from "@/actions/makeAuthenticateRequest";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SOCKET_URL } from "@/config";

export default function Arena() {
  const [socket, setSocket] = React.useState<Socket | null>(null);
  const [_, setRunning] = useCodeRunning();
  const [____, setQuestion] = useQuestion();
  const [user, __] = useUser();
  const [opponent, setOpponent] = useOpponent();
  const router = useRouter();

  const needToReconnect = useSearchParams().get(
    "reconnect"
  ) as unknown as boolean;

  React.useEffect(() => {
    makeAuthenticatedRequest(`/dual/check?userId=${user.id}`).then((data) => {
      const inARoom = data.inARoom as unknown as boolean;
      if (inARoom) {
        const socket = io(SOCKET_URL);

        socket.on("connect", () => {
          socket.emit("arena", user.id);
        });

        socket.on("question", (data) => {
          setQuestion(data);
        });
        if (needToReconnect) {
          socket.emit("reconnect", user.id);
          socket.on("re-connected", (data) => {
            const room = data;
            console.log(room);
            setQuestion(room.question);
            if (user.id == room.player1.userId) {
              setOpponent(room.player2);
            } else if (user.id == room.player2.userId) {
              setOpponent(room.player1);
            }
          });
        }

        socket.on("submission", (data: any) => {
          setRunning(false);
          //TODO check for question submission
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
      } else {
        toast.info("You are not in any room, redirecting");
        router.push("/dashboard");
      }
    });
  }, [user]);

  return (
    <main className="px-6">
      <ArenaNavBar
        player1={user.username}
        player2={opponent.username}
        player1Rating={user.rating}
        player2Rating={opponent.rating}
        socket={socket}
      />
      <div className="flex gap-2">
        <ArenaQuestion />
        <ArenaEditor socket={socket} />
      </div>
    </main>
  );
}
