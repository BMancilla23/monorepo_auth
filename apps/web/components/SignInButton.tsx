import { getSession } from "@/services/session";
import Link from "next/link";

const SignInButton = async () => {
  const session = await getSession();

  return (
    <div className="flex gap-x-6">
      {!session || !session?.user ? (
        <Link href="/auth/signin">Acceder</Link>
      ) : (
        <>
          <p>{session?.user.name}</p>
          <Link href="/api/auth/signout">Cerrar sesión</Link>
        </>
      )}
    </div>
  );
};

export default SignInButton;
