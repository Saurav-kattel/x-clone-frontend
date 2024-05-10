import { backendUrl } from "@/lib/exportEnvs";
type CommentPayload = {
  comment: string;
  tweetId: string;
  parentCommentId?: string
  cookie: string
  authorId: string
}
export type Comment = {
  id: string;
  comment: string;
  created_at: Date;
  user_id: string
  tweet_id: string;
  parent_comment_id: string;
}

export async function handlePostComment({ comment, tweetId, authorId, parentCommentId, cookie }: CommentPayload) {

  const response = await fetch(backendUrl + '/api/v1/tweet/comment', {
    method: "POST",
    headers: {
      auth_token_x_clone: cookie
    },
    body: JSON.stringify({
      comment: comment,
      tweet_id: tweetId,
      parent_comment_id: parentCommentId ?? null,
      replied_to: authorId
    })
  })


  const data = await response.json();
  console.log(data)
}
