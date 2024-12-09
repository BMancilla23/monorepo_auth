"use server";

import { BACKEND_URL } from "@/constants/config";
import { createSession, updateTokens } from "@/services/session";
import { FormState, LoginFormSchema, RegisterFormSchema } from "@/types/auth";
import { redirect } from "next/navigation";

// Acción del servidor que valida los datos del formulario y envía una solicitud al backend
export async function signUp(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  // Valida los campos usando el esquema RegisterFormScheam
  const validationFields = RegisterFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // Si la validación falla, devuelve los errores organizados
  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors, // Extrae los errores para cada campo
    };
  }

  // Enviar los datos al backend
  const response = await fetch(`${process.env.BACKEND_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validationFields.data),
  });

  // Redirigir al usuario si la solicitud es exitoso
  if (response.ok) {
    // Devuelve un mensaje de error específico en case de fallo
    const result = await response.json();
    console.log(result);
    redirect("/auth/signin");
  }

  console.error(
    `Failed wirth status ${response.status}`,
    await response.text()
  );

  return {
    message:
      response.status === 409 ? "User already exists!" : "An error occurred",
  };

  /*  return {
    message:
      response.status === 409 ? "User already exists!" : response.statusText,
  }; */
}

export async function signIn(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success)
    return { error: validatedFields.error.flatten().fieldErrors };

  const response = await fetch(`${BACKEND_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedFields.data),
  });

  if (response.ok) {
    const result = await response.json();
    // TODO: create the session for authenticated user
    /* console.log({ result }); */
    await createSession({
      user: {
        id: result.id,
        name: result.name,
      },
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });

    redirect("/");
  }

  return {
    message:
      response.status === 401 ? "Invalid credentials" : response.statusText,
  };
}

export const refreshToken = async (oldRefreshToken: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/refresh-token`, {
      method: "POST",
      body: JSON.stringify(oldRefreshToken),
    });

    /*  if (!response.ok) {
      throw new Error("Failed to refresh token");
    } */

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Failed to refresh token", errorData);
      throw new Error("Failed to refresh token");
    }

    const { accessToken, refreshToken } = await response.json();
    // Update session with new tokens
    const updateRes = await fetch("http://localhost:3000/api/auth/update", {
      method: "POST",
      body: JSON.stringify({
        accessToken,
        refreshToken,
      }),
    });

    if (!updateRes.ok) throw new Error("Failed to update the tokens");

    return accessToken;
  } catch (error) {
    console.error("Refresh token failed", error);
    return null;
  }
};
