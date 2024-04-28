import { backendUrl } from "@/lib/exportEnvs";

export async function getFollowers({ token }: { token: string }) {
  try {
    const res = await fetch(backendUrl + "/api/v1/user/followers", {
      method: "GET",
      headers: {
        auth_token_x_clone: token
      }
    })

    const data = await res.json()
    return data;
  } catch (err) {
    console.error(err)
    return undefined
  }
}

