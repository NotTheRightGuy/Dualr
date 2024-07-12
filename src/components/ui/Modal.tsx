"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CircleAlert as FiAlertCircle } from "lucide-react";
import { useState } from "react";
import { Socket } from "socket.io-client";
import { useUser } from "@/store/hooks/useUser";

const Modal = ({ socket }: { socket: Socket | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="grid place-content-center">
      <button
        onClick={() => setIsOpen(true)}
        className="rounded bg-red-600 px-4 py-2 font-medium text-white transition-opacity hover:opacity-90"
      >
        End Dual
      </button>
      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} socket={socket} />
    </div>
  );
};

const SpringModal = ({
  isOpen,
  setIsOpen,
  socket,
}: {
  isOpen: any;
  setIsOpen: any;
  socket: Socket | null;
}) => {
  const [user, _] = useUser();
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 grid cursor-pointer place-items-center overflow-y-scroll bg-slate-900/20 p-8 backdrop-blur"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg cursor-default overflow-hidden rounded-lg bg-gradient-to-br from-red-600 to-red-800 p-6 text-white shadow-xl"
          >
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="absolute -left-24 -top-24 z-0 rotate-12 text-[250px] text-white/10"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <div className="relative z-10">
              <div className="mx-auto mb-2 grid h-16 w-16 place-items-center rounded-full bg-white text-3xl text-red-600">
                <FiAlertCircle />
              </div>
              <h3 className="mb-2 text-center text-3xl font-bold">
                Are you sure?
              </h3>
              <p className="mb-6 text-center">
                Ending this dual with declare your opponent as winner and your
                ratings will be affected.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full rounded bg-transparent py-2 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Nah, go back
                </button>
                <button
                  onClick={() => {
                    if (socket) {
                      socket.emit("end-dual", user.id);
                    }
                    setIsOpen(false);
                  }}
                  className="w-full rounded bg-white py-2 font-semibold text-red-600 transition-opacity hover:opacity-90"
                >
                  Yeah, go ahead
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
