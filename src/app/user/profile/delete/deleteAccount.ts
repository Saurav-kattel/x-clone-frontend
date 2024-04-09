import { backendUrl } from "@/lib/exportEnvs";

export async function handleSubmit(data: { password: string }, cookie: string) {
  const res = await fetch(backendUrl + "/api/v1/user/account/delete", {
    method: "DELETE",
    credentials: "include",
    headers: {
      auth_token_x_clone: cookie,
    },
    body: JSON.stringify({
      password: data.password,
    }),
  });

  const json = await res.json();

  return json;
}
