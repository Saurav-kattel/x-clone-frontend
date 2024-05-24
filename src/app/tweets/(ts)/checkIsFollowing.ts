"use server"
import { backendUrl } from "@/lib/exportEnvs";

export async function checkIsFollowing({ token, followeeId }: { token: string; followeeId: string, }) {

  try {
    const res = await fetch(`${backendUrl}/api/v1/user/is-following?f_id=${followeeId}`, {
      method: "POST",
      headers: {
        auth_token_x_clone: token
      }
    })
    const data = await res.json()
    return data;
  } catch (error) {
    console.log(error)
    return undefined
  }
}
