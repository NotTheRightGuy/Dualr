import { getSession } from "next-auth/react";
import jwt from "jsonwebtoken";
import { BACKEND_URL } from "@/config";

export default async function makeAuthenticatedRequest(
  url: string,
  method?: string,
  body?: any
) {
  const session: any = await getSession();
  if (session) {
    const token = jwt.sign(
      session,
      process.env.NEXT_PUBLIC_AUTH_SECRET as string,
      {
        expiresIn: "10s",
      }
    );
    const res = await fetch(`${BACKEND_URL}${url}`, {
      method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Using session ID as a token
      },
    });
    return res.json();
  } else {
    return { message: "No Session Found" };
  }
}
