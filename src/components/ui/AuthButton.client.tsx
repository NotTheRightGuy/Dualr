"use client";

import { useSession } from "next-auth/react";
import { Button } from "./button";
import { signIn, signOut } from "@/auth/helper";

export default function AuthButtonClient() {
  const session = useSession();
  return session?.data?.user ? (
    <Button
      onClick={async () => {
        await signOut();
        await signIn();
      }}
    >
      Sign out
    </Button>
  ) : (
    <Button onClick={async () => await signIn()}>Sign in</Button>
  );
}
