import { backendUrl } from "@/lib/exportEnvs";

export async function getCommetCount({ tweetId }: { tweetId: string }) {
  const response = await fetch(backendUrl + "/api/v1/tweet/comment/count?t_id=" + tweetId);
  const data = await response.json()
  return data;
}
