import { backendUrl } from "@/lib/exportEnvs";
import { TweetLikedUser } from "./hasUserLiked";

export interface Response {
  status: number;
  res: TweetLikedUser[] | null;
}

export async function getLikedUsers({ tweetId, token }: { tweetId: string; token: string }): Promise<Response | undefined> {
  try {
    const res = await fetch(`${backendUrl}/api/v1/tweet/like/users?t_id=${tweetId}`, {
      method: "GET",
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
