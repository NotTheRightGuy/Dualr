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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SOCKET_URL } from "@/config";
import { Skeleton } from "@/components/ui/skeleton";

function LoadingSkeleton() {
  return (
    <div className="h-screen p-6">
      <Skeleton className="h-full w-full opacity-10" />
    </div>
  );
}

export type Delta = {
  player1Delta: number;
  player2Delta: number;
};

export default function Arena() {
  const socketRef = React.useRef<Socket | null>(null);
  const [_, setRunning] = useCodeRunning();
  const [____, setQuestion] = useQuestion();
  const [startTime, setStartTime] = React.useState<number>(0);
  const [user, __] = useUser();
  const [opponent, setOpponent] = useOpponent();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);
  const [delta, setDelta] = React.useState<Delta>({
    player1Delta: 35,
    player2Delta: 35,
  });

  const needToReconnect = useSearchParams().get(
    "reconnect"
  ) as unknown as boolean;

  React.useEffect(() => {
    if (user.id) {
      setIsLoading(false);
    }
  }, [user.id]);

  React.useEffect(() => {
    if (isLoading) return;

    const socket = io(SOCKET_URL);
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("arena", user.id);
    });

    socket.on("not-found", () => {
      toast.info("No Dual Found! Redirecting");
      router.push("/dashboard");
    });

    //TODO Send the entire room instead of just question
    socket.on("question", (data) => {
      setQuestion(data);
    });

    if (needToReconnect) {
      socket.emit("reconnect", user.id);
      socket.on("re-connected", (data) => {
        const room = data;
        //!Debugging
        console.log(room.question);
        //!
        setQuestion(room.question);
        setStartTime(room.startTime);
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
  }, [isLoading, user.id, needToReconnect]);

  if (isLoading) {
    return <LoadingSkeleton />; // Or any loading indicator
  }

  return (
    <main className="px-6">
      <ArenaNavBar
        player1={user.username}
        player2={opponent.username}
        player1Rating={user.rating}
        player2Rating={opponent.rating}
        socket={socketRef.current}
        startTime={startTime}
        delta={delta}
      />
      <div className="flex gap-2">
        <ArenaQuestion />
        <ArenaEditor socket={socketRef.current} />
      </div>
    </main>
  );
}
