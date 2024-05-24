import { backendUrl } from "@/lib/exportEnvs";

type args = {
  parentCommentId: string | null;
  token: string;
  tweetId: string;
  commentId: string;
}
export type ReplyData = {
  id: string;
  reply: string;
  tweet_id: string;
  replied_to: string;
  replied_from: string;
  replied_to_username: string;
  replied_from_username: string;
  created_at: string;
  comment_id: string;
  parent_id?: string | null;
}

export type ReplyResponse = {
  status: number;
  res: ReplyData[];
}

export async function getReplyData({ parentCommentId, token, tweetId, commentId }: args): Promise<ReplyResponse> {
  const response = await fetch(`${backendUrl}/api/v1/tweet/reply?t_id=${tweetId}&p_id=${parentCommentId}&c_id=${commentId}`, {
    method: 'GET',
    headers: {
      auth_token_x_clone: token
    },
  })

  const data = await response.json()
  return data;
}
