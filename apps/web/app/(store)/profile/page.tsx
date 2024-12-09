import { getProfile } from "@/actions/user/user";

export default async function ProfilePage() {
  const res = await getProfile();

  return (
    <div>
      <h1>Profile Page</h1>
      <p>{JSON.stringify(res)}</p>
    </div>
  );
}
