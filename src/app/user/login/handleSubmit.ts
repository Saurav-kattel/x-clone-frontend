import { backendUrl } from "@/lib/exportEnvs";
import { redirect } from "next/navigation";

export async function handleSubmit(data: { email: string; password: string }) {
  try {
    const response = await fetch(backendUrl + "/api/v1/user/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });
    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
  }
}
