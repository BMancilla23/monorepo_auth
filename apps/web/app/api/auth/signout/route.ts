import { BACKEND_URL } from "@/constants/config";
import { authFetch } from "@/lib/authFetch";
import { deleteSession } from "@/services/session";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const response = await authFetch(`${BACKEND_URL}/auth/signout`, {
      method: "POST",
    });

    /* console.log(response); */

    if (response.ok) {
      console.log("Sign-out successfull");

      await deleteSession();
    } else {
      console.error("Signout failed", response.statusText);
    }

    revalidatePath("/", "layout");
    revalidatePath("/", "page");
    return NextResponse.redirect(new URL("/", req.nextUrl));
  } catch (error) {
    console.error("Unexpected error", error);
    return NextResponse.json(
      {
        error: "All unexpected error occurred",
      },
      {
        status: 500,
      }
    );
  }
}
