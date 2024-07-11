import Link from "next/link";

export default function DashboardNavbar() {
  return (
    <div className="mb-8 border-b-2 border-light-4/20 py-6">
      <nav className="mx-auto flex justify-between">
        <div className="text-headline-6 font-semibold">Dualr</div>
        <div className="flex gap-4 *:text-base-1 *:font-medium *:text-light-3">
          <Link href="">Compete</Link>
          <Link href="">Friends</Link>
          <Link href="">Leaderboard</Link>
        </div>
      </nav>
    </div>
  );
}
