import Navbar from "@/components/Navbar";
import HeroBg from "@/components/HeroBg";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="px-28">
      <Navbar />
      <HeroBg>
        <section className="absolute">
          <div className="text-center">
            <p className="text-headline-2 mt-28 font-bold leading-tight">
              Coding excites us. <br />
              But imagine competing with others <br />
              to enchance your algorithmic skills?
            </p>
          </div>
          <p className="text-base-2 mt-6 text-center opacity-60">
            Enchance your coding skills with exciting challenges, ensuring your
            solutions are clean and comprehesible. <br />
            Sounds straight forward, doesn't it? Welcome to Dualr, the
            competitive coding platform
            <br />
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button className="bg-brand-1 rounded-full transition-colors hover:bg-blue-500">
              Get Started
            </Button>
            <Button className="rounded-full border-2 transition-opacity hover:opacity-75">
              Login
            </Button>
          </div>
        </section>{" "}
      </HeroBg>
    </div>
  );
}
