import { auth } from "@/auth";
import AuthButtonServer from "@/components/ui/AuthButton.server";

export default async function Dashboard() {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session, null, 2)}
      <AuthButtonServer />
    </div>
  );
}
