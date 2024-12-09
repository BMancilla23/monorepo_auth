"use client";

import { signIn } from "@/actions/auth/auth";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/submitButton";
import Link from "next/link";
import React, { useActionState } from "react";

const SignInForm = () => {
  const [state, action] = useActionState(signIn, undefined);

  return (
    <form className="w-full" action={action}>
      <div className="flex flex-col gap-y-3">
        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
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
          <p className="text-sm text-red-500">{state.error.password}</p>
        )}

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Checkbox id="remind" />
            <Label htmlFor="remind">Recuérdame</Label>
          </div>
          <div>
            <Button asChild variant="link">
              <Link className="text-sm underline" href="#">
                Forgot password
              </Link>
            </Button>
          </div>
        </div>

        <SubmitButton>Iniciar sesión</SubmitButton>
      </div>
    </form>
  );
};

export default SignInForm;
