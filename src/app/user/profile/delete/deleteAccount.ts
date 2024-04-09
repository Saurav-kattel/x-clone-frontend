"use server";

import { backendUrl } from "@/lib/exportEnvs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function handleSubmit(data: { password: string }) {
  const res = await fetch(backendUrl + "/api/v1/user/account/delete", {
    method: "DELETE",
    credentials: "include",
    headers: {
      auth_token_x_clone: cookies().get("auth_token_x_clone")?.value ?? "",
    },
    body: JSON.stringify({
      password: data.password,
    }),
  });

  const json = await res.json();
  if (res.ok) {
    redirect("/user/login");
  }
  return json;
}
