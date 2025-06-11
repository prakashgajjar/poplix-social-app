import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function getUserIdFromToken(): Promise<string | null> {
  try {
    const token = cookies().get("login")?.value;
    if (!token) return null;

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    return payload.userId as string;
  } catch (err) {
    console.error("JWT verify error:", err);
    return null;
  }
}