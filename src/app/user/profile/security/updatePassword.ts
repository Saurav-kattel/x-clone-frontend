"use server";

import { backendUrl } from "@/lib/exportEnvs";
import { cookies } from "next/headers";

export async function handleSubmit(data: {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}) {
  const res = await fetch(backendUrl + "/api/v1/user/account/password", {
    method: "PUT",
    credentials: "include",
    headers: {
      auth_token_x_clone: cookies().get("auth_token_x_clone")?.value ?? "",
    },
    body: JSON.stringify({
      old_password: data.oldPassword,
      new_password: data.newPassword,
      confirm_password: data.confirmPassword,
    }),
  });

  const json = await res.json();

  return json;
}
