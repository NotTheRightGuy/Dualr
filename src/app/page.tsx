import HeroNavbar from "@/components/HeroNavbar";
import HeroBg from "@/components/HeroBg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="px-28">
      <HeroNavbar />
      <HeroBg>
        <section className="absolute">
          <div className="text-center">
            <p className="mt-28 text-headline-2 font-bold leading-tight">
              Coding excites us. <br />
              But imagine competing with others <br />
              to enchance your algorithmic skills?
            </p>
          </div>
          <p className="mt-6 text-center text-base-2 opacity-60">
            Enchance your coding skills with exciting challenges, ensuring your
            solutions are clean and comprehesible. <br />
            Sounds straight forward, doesn&apos;t it? Welcome to Dualr, the
            competitive coding platform
            <br />
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/auth/signup">
              <Button className="rounded-full bg-brand-1 transition-colors hover:bg-blue-500">
                Get Started
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button className="rounded-full border-2 transition-opacity hover:opacity-75">
                Login
              </Button>
            </Link>
          </div>
        </section>{" "}
      </HeroBg>
    </div>
  );
}
