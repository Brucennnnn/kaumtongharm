"use server";
import { db } from "@ktm/server/db";
import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { lucia } from "@ktm/server/api/auth";
import { redirect } from "next/navigation";
import { generateId } from "lucia";
import { validateRequest } from "@ktm/server/api/auth";

export async function signup(
  username: string,
  password: string,
): Promise<ActionResult> {
  const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(15);

  await db.user.create({
    data: {
      id: userId,
      username: username,
      hashedPassword: hashedPassword,
    },
  });
  console.log("successfully created");

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/gameroom");
}

interface ActionResult {
  error: string;
}

export async function login(
  username: string,
  password: string,
): Promise<ActionResult> {
  const existingUser = await db.user.findUnique({
    where: {
      username: username,
    },
    select: {
      hashedPassword: true,
      id: true,
    },
  });
  if (!existingUser) {
    return {
      error: "Incorrect username or password",
    };
  }

  const validPassword = await new Argon2id().verify(
    existingUser.hashedPassword,
    password,
  );
  if (!validPassword) {
    return {
      error: "Incorrect username or password",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/gameroom");
}
export async function logout(): Promise<ActionResult> {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/login");
}
