"use server";

import { signIn, signOut } from "@/auth";

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

export async function doCredentialLogin(formData: FormData) {
  console.log("formData", formData);

  try {
    return await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
  } catch (err) {
    throw err;
  }
}
