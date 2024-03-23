import { db } from "@ktm/server/db";
import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { lucia } from "@ktm/server/api/auth";
import { redirect } from "next/navigation";
import { generateId } from "lucia";

export async function signup(formData: FormData): Promise<ActionResult> {
  "use server";
  const username = formData.get("username");
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    console.log("a");
    return {
      error: "Invalid username",
    };
  }
  const password = formData.get("password");
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    console.log("b");
    return {
      error: "Invalid password",
    };
  }
  console.log("c");

  const hashedPassword = await new Argon2id().hash(password);
  console.log("d");
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
  return redirect("/");
}

interface ActionResult {
  error: string;
}
