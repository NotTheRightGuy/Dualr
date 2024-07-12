import { Button } from "./ui/button";
import Link from "next/link";
import { auth } from "@/auth";

export default async function HeroNavbar() {
  const session = await auth();
  return (
    <div className="flex justify-between py-4">
      <p className="text-headline-5 font-semibold">Dualr</p>
      <div className="*:text-body-6 flex items-center gap-10 *:cursor-pointer *:font-medium *:transition-opacity hover:*:opacity-85">
        <p>About</p>
        <p>Features</p>
        <p>Blog</p>
        <p>Event</p>
        <p>Pricing</p>
        {session?.user ? (
          <>
            <Link href="/dashboard">
              <Button className="rounded-full bg-brand-1 hover:bg-blue-500">
                Dashboard
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/auth/signup">
              <Button className="rounded-full bg-brand-1 hover:bg-blue-500">
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
