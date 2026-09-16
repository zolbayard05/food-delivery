import { Context, Next } from "hono";
import { verifyJwt } from "../util/jwt.js";

export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return c.json({ message: "Nevterne uu" }, 401);
  }

  const token = authHeader.slice("Bearer ".length);

  try {
    const payload = verifyJwt(token);
    c.set("userId", payload.id);
    c.set("role", payload.role);
  } catch (error) {
    return c.json({ message: "Token buruu esvel hugatsaa duussan" }, 401);
  }

  await next();
};

export const adminMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return c.json({ message: "Nevterne uu" }, 401);
  }

  const token = authHeader.slice("Bearer ".length);

  try {
    const payload = verifyJwt(token);

    if (payload.role !== "ADMIN") {
      return c.json({ message: "Erh hangalttai bish baina" }, 403);
    }

    c.set("userId", payload.id);
    c.set("role", payload.role);
  } catch (error) {
    return c.json({ message: "Token buruu esvel hugatsaa duussan" }, 401);
  }

  await next();
};
