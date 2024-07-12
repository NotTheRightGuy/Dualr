"use client";
import React from "react";
import { useUser } from "@/store/hooks/useUser";
import DashboardNavbar from "@/components/DashboardNavbar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";
import {
  PlayCircleIcon,
  Loader,
  LoaderCircle,
  Ban,
  CheckIcon,
} from "lucide-react";
import { SOCKET_URL } from "@/config";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { io, Socket } from "socket.io-client";
import { useOpponent } from "@/store/hooks/useOpponent";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, _] = useUser();
  const [__, setOpponent] = useOpponent();
  let [socket, setSocket] = React.useState<Socket | null>(null);
  const [matchFinding, setMatchFinding] = React.useState<boolean>(false);
  const [matchFound, setMatchFound] = React.useState<boolean>(false);
  const router = useRouter();

  function MatchFindingNotch(): JSX.Element {
    return (
      <motion.div
        className="fixed left-0 top-0 flex w-full justify-center"
        initial={{
          opacity: 0,
          y: "-100%",
        }}
        animate={{
          opacity: 1,
          y: "0",
        }}
        exit={{
          opacity: 0,
          y: "-100%",
        }}
      >
        {matchFound ? (
          <div className="bg-green flex h-16 max-w-md items-center gap-4 rounded-b-md bg-green-700 px-12">
            <CheckIcon className="text-white" />
            <p className="text-headline-6 font-semibold text-light-2">
              Dual Found, Redirecting to Arena
            </p>
          </div>
        ) : (
          <>
            <div className="flex h-16 max-w-md items-center gap-4 rounded-b-md border-b-4 border-l-4 border-r-4 border-light-4 bg-dark-1 px-12">
              <LoaderCircle className="animate-spin" />
              <p className="text-headline-6 font-semibold text-light-2">
                Looking for a dual
              </p>
            </div>
          </>
        )}
      </motion.div>
    );
  }

  function lookForDual() {
    setMatchFound(false);
    setMatchFinding(true);

    if (!socket) {
      const so = io(SOCKET_URL);
      setSocket(so);
      so.emit("find", user);
    }
  }

  if (socket) {
    socket.on("found", (data) => {
      setOpponent(data);
      setMatchFound(true);
      socket.close();
      setSocket(null);
      setTimeout(() => {
        setMatchFinding(false);
        router.push("/dashboard/arena");
      }, 2000);
    });
  }

  return (
    <div className="max-w-screen relative flex min-h-screen flex-col px-10">
      <DashboardNavbar />
      <AnimatePresence>{matchFinding && <MatchFindingNotch />}</AnimatePresence>

      <nav className="flex items-center gap-4">
        <Image
          src={`https://api.dicebear.com/9.x/notionists/svg?seed=${user.username}`}
          width={48}
          height={48}
          alt="User Avatar"
          className="rounded-full bg-light-2"
        />
        <p className="text-headline-5 font-semibold">{user.username}</p>
        <div className="ml-4 flex items-center gap-2">
          <Trophy className="text-accent-yellow" />
          <p className="text-body-2 font-medium">{user.rating}</p>
        </div>
      </nav>
      <main className="mt-8 flex flex-grow">
        <section className="flex flex-[2] gap-2">
          {matchFinding ? (
            <DashBoardButton
              text="Cancel"
              Icon={Ban}
              className="border-red-500/70 bg-red-500/70 hover:bg-red-500/90"
              onClick={() => {
                setMatchFinding(false);
                if (socket) {
                  socket.close();
                  setSocket(null);
                }
              }}
            />
          ) : (
            <DashBoardButton
              text="Start Dual"
              Icon={PlayCircleIcon}
              IconClassName={"text-brand-1"}
              onClick={lookForDual}
            />
          )}

          <DashBoardButton
            text="Coming"
            Icon={Loader}
            IconClassName="text-yellow-500"
            disabled={true}
          />
          <DashBoardButton
            text="Coming"
            Icon={Loader}
            IconClassName="text-yellow-500"
            disabled={true}
          />
        </section>
        <aside className="flex-[1]"></aside>
      </main>
    </div>
  );
}
function DashBoardButton({
  text,
  Icon,
  className,
  IconClassName,
  disabled,
  onClick,
}: {
  text: string;
  Icon: any;
  IconClassName?: string;
  className?: string;
  disabled?: boolean;
  onClick?: any;
}) {
  return (
    <Button
      className={cn(
        "r flex w-64 gap-4 border-8 border-dark-2 bg-dark-3 py-12 hover:bg-dark-2",
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      <Icon className={cn("h-10 w-10", IconClassName)} />
      <p className="text-headline-5 font-semibold">{text}</p>
    </Button>
  );
}
