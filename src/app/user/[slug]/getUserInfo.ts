import { backendUrl } from "@/lib/exportEnvs";
import { cookies } from "next/headers";

export async function getUserInfo({ username }: { username: string }) {
  try {
    const response = await fetch(`${backendUrl}/api/v1/user/get?u_name=${username}`, {
      headers: {
        auth_token_x_clone: cookies().get("auth_token_x_clone")?.value ?? ""
      }
    })
    const data = await response.json()
    return data;

  } catch (e) {
    console.error(e)
    return undefined
  }

}
