import { z } from "zod";

// Define un tipo para manejar el estado del formulario en al aplicación

// Este estado puede cotener errores especificos para cada campo y un mensaje general para mostrar al usuario
export type FormState =
  | {
      error?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

/* export type FormState =
  | {
      error?: Record<"name" | "email" | "password", string[]>;
      message?: string;
    }
  | undefined;
 */

// Esquema de validación del formulario usando Zod
// Valida el nombre, correo y contraseña con reglas estrictas
export const RegisterFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .trim(),
  email: z
    .string()
    .email({
      message: "Please enter a valid email",
    })
    .trim(),
  password: z
    .string()
    .min(8, {
      message: "Be at least 8 characters long",
    })
    .regex(/[a-zA-Z]/, {
      message: "Contain at least one letter",
    })
    .regex(/[0-9]/, {
      message: "Contain at least one number",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password field must not be empty." }),
});
