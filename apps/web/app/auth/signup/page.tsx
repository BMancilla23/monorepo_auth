import Link from "next/link";
import SignupForm from "./SignupForm";

export default function RegisterPage() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col justify-center items-center">
      <h1 className="text-center text-2xl font-bold mb-4">Registrate</h1>

      {/* Register form */}
      <SignupForm />

      <div className="flex justify-center mt-2 text-sm gap-2">
        <p className="text-bold">Tienes una cuenta?</p>
        <Link className="underline" href="/auth/signin">
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
}
