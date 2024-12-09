import { getSession } from "@/services/session";
import { redirect } from "next/navigation";

export default async function OverviewPage() {
  const session = await getSession();

  if (!session || !session.user) redirect("/auth/signin");

  console.log(session);

  return (
    <div>
      <h1>Hello Page</h1>
    </div>
  );
}
