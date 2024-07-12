import Link from "next/link";
import { signOut } from "@/auth/helper";

export default function DashboardNavbar() {
  return (
    <div className="mb-8 border-b-2 border-light-4/20 py-6">
      <nav className="mx-auto flex justify-between">
        <div className="text-headline-6 font-semibold">Dualr</div>
        <div className="flex items-center gap-4 *:text-base-1 *:font-medium *:text-light-3">
          <Link href="">Compete</Link>
          <Link href="">Friends</Link>
          <Link href="">Leaderboard</Link>
          <button
            className="underline"
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </button>
        </div>
      </nav>
    </div>
  );
}
