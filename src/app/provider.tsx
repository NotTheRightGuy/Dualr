"use client";
import { RecoilRoot } from "recoil";
import { UserProvider } from "@/context/userContext";

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RecoilRoot>
      <UserProvider>{children}</UserProvider>
    </RecoilRoot>
  );
}
