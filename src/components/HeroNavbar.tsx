import { Button } from "./ui/button";

export default function HeroNavbar() {
  return (
    <div className="flex justify-between py-4">
      <p className="text-headline-5 font-semibold">Dualr</p>
      <div className="*:text-body-6 flex items-center gap-10 *:cursor-pointer *:font-medium *:transition-opacity hover:*:opacity-85">
        <p>About</p>
        <p>Features</p>
        <p>Blog</p>
        <p>Event</p>
        <p>Pricing</p>
        <Button className="rounded-full bg-brand-1 hover:bg-blue-500">
          Sign Up
        </Button>
      </div>
    </div>
  );
}
