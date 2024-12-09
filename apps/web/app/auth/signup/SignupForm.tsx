"use client";

import { signUp } from "@/actions/auth/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/submitButton";
import { useActionState } from "react";

const SignupForm = () => {
  const [state, action] = useActionState(signUp, undefined);

  return (
    <form className="w-full" action={action}>
      <div className="flex flex-col gap-y-3">
        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
        <div>
          <Label htmlFor="name">Nombre</Label>
          <Input id="name" name="name" type="text" placeholder="Jhon doe" />
        </div>
        {state?.error?.name && (
          <p className="text-sm text-red-500">{state.error.name}</p>
        )}
        <div>
          <Label htmlFor="email">Correo</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="example@gmail.com"
          />
        </div>
        {state?.error?.email && (
          <p className="text-sm text-red-500">{state.error.email}</p>
        )}
        <div>
          <Label htmlFor="password">Contraseña</Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="******"
          />
        </div>
        {state?.error?.password && (
          <div>
            <p>Password must</p>
            <ul>
              {state.error.password.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <SubmitButton>Registrar</SubmitButton>
      </div>
    </form>
  );
};

export default SignupForm;
