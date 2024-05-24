import { backendUrl } from "@/lib/exportEnvs";
import { CommentResponseData } from "./getUserComments";

export async function getAllComments({ tweetId, pageNumber, pageSize }: { pageNumber: number; pageSize: number; tweetId: string }): Promise<CommentResponseData | undefined> {
  try {
    const response = await fetch(`${backendUrl}/api/v1/tweet/comment/get?t_id=${tweetId}&s=${pageSize}&n=${pageNumber}`)
    const data = await response.json();
    return data;
  } catch (e: any) {
    console.error(e.message)
    return undefined
  }
}
