import { backendUrl } from "@/lib/exportEnvs";

export async function handleLike({ tweetId, token }: { tweetId: string; token: string }) {
  try {
    const res = await fetch(`${backendUrl}/api/v1/tweet/like?t_id=${tweetId}`, {
      method: "POST",
      headers: {
        auth_token_x_clone: token
      }
    })
    let data = await res.json()
    return data
  } catch (err) {
    return undefined
  }
}
