import { backendUrl } from "@/lib/exportEnvs";

export async function handleFollow({ token, followeeId }: { token: string; followeeId: string }) {

  try {
    await fetch(`${backendUrl}/api/v1/user/follow?f_id=${followeeId}`, {
      method: "POST",
      headers: {
        auth_token_x_clone: token
      }
    })

  } catch (error) {
    console.log(error)
    return undefined
  }
}
