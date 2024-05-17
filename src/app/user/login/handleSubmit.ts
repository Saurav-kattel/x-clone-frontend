import { backendUrl } from "@/lib/exportEnvs";

export async function handleSubmit({ email, password }: { email: string; password: string }) {
  try {
    const response = await fetch(backendUrl + "/api/v1/user/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const json = await response.json();

    return json;
  } catch (err) {
    console.log(err);
  }
}
