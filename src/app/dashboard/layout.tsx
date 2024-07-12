"use client";

import React from "react";
import { useUser } from "@/store/hooks/useUser";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BACKEND_URL } from "@/config";

export default function layout({ children }: { children: React.ReactNode }) {
  const session = useSession();
  const { data, status } = session;
  const [user, setUser] = useUser();
  const router = useRouter();

  React.useEffect(() => {
    if (status === "authenticated") {
      if (!Object.keys(user).length) {
        fetch(`${BACKEND_URL}/me?email=${data.user?.email}`)
          .then((res) => res.json())
          .then((data) => {
            setUser(data);
            if (data.message === "Already in Dual") {
              toast.info("Redirecting you to ongoing dual");
              router.push("/dashboard/arena?reconnect=true");
            }
          })
          .catch((err) => {
            console.error("There was an issue fetching user data");
            console.error(err);
          });
      }
    }
  }, []);

  return <div className="flex min-h-screen flex-col">{children}</div>;
}
