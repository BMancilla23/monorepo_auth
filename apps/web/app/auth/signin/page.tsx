import Link from "next/link";
import SignInForm from "./SignInForm";
import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "@/constants/config";
import { FaGoogle } from "react-icons/fa";

export default function SignInPage() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col justify-center items-center">
      <h1 className="text-center text-2xl font-bold mb-4">Acceder</h1>

      {/* Login form */}
      <SignInForm />

      <div className="flex justify-center items-center py-4">
        <Button asChild variant="destructive" className="text-base">
          <a href={`${BACKEND_URL}/auth/google/login`}>
            Iniciar con google
            <FaGoogle className="text-[1.5rem] ml-2" />
          </a>
        </Button>
      </div>

      <div className="flex justify-center text-sm gap-2">
        <p className="text-bold">No tienes una cuenta?</p>
        <Link className="underline" href="/auth/signup">
          Registrate
        </Link>
      </div>
    </div>
  );
}
