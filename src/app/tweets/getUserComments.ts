import { backendUrl } from "@/lib/exportEnvs";

export type ResponseData = {
  status: number;
  res: CommentData[] | null
}

export type CommentData = {
  id: string;
  comment: string;
  createdAt: string;
  userId: string;
  tweet_id: string; parentTweetId?: string;
  username: string;
}


export async function getUserComment({ tweetId, token, pageNumber, pageSize }: { pageNumber: number; pageSize: number; tweetId: string; token: string }): Promise<ResponseData | undefined> {
  try {
    const res = await fetch(`${backendUrl}/api/v1/tweet/user/comments?t_id=${tweetId}&n=${pageNumber}&s=${pageSize}`, {
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
