"use server";

import { BACKEND_URL } from "@/constants/config";
import { authFetch } from "@/lib/authFetch";
import { getSession } from "@/services/session";

export const getProfile = async () => {
  /* const session = await getSession();

  const response = await fetch(`${BACKEND_URL}/auth/protected`, {
    headers: {
      authorization: `Bearer ${session?.accessToken}`,
    },
  }); */

  const response = await authFetch(`${BACKEND_URL}/auth/protected`);

  const result = await response.json();

  return result;
};
