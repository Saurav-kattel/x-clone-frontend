'use server'
import { backendUrl } from "@/lib/exportEnvs";
import { VisType } from "../home/Header";

export type Tweets = {
  id: string;
  content: string;
  userId: string;
  imageId: string;
  createdAt: Date;
  author: string;
  updatedAt: Date;
  visibility: VisType;
  author_username: string;
}

export type TweetRes = {
  status: number;
  res: Tweets[];
}
export async function getTweetsData({ pageNum, pageSize, tweetId }: { pageSize: number; pageNum: number; tweetId?: string }) {
  try {
    const tweets = await fetch(`${backendUrl}/api/v1/tweet/get?n=${pageNum}&s=${pageSize}&t_id=${tweetId}`, {
      method: "GET",
      next: { tags: ["tweets"] },
    })
    return tweets.json();
  } catch (e) {
    console.error(e)
    return undefined
  }
}
