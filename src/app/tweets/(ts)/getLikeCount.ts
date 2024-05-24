import { backendUrl } from "@/lib/exportEnvs";

export async function getLikeCount(tweetId: string) {
  try {
    const res = await fetch(backendUrl + "/api/v1/tweet/like/count?t_id=" + tweetId, {
      cache: "no-store"
    });
    return await res.json();
  } catch (err) {
    console.log(err)
    return undefined
  }
}
