import { getSession } from "@/services/session";

export default async function Home() {
  const session = await getSession();
  console.log(session);

  return (
    <div>
      <h1>Home page</h1>
    </div>
  );
}
