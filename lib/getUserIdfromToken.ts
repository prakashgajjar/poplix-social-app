import { cookies } from "next/headers";
import { jwtVerify } from "jose";

interface JWTPayload {
  userId?: string;
}

export async function getUserIdFromToken(): Promise<string | null> {
  try {
    const token = await cookies().get("login")?.value;
    if (!token) return null;

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

    const { payload } = await jwtVerify(token, secret) as { payload: JWTPayload };

    return payload.userId ?? null;
  } catch (err) {
    console.error("JWT verify error:", err);
    return null;
  }
}
