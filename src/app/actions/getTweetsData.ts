'use server'
import { backendUrl } from "@/lib/exportEnvs";

export type Tweets = {
  id: string;
  content: string;
  userId: string;
  imageId: string;
  createdAt: Date;
  author: string;
  updatedAt: Date;
}

export type TweetRes = {
  status: number;
  res: Tweets[];
}
export async function getTweetsData({ pageNum, pageSize }: { pageSize: number; pageNum: number }): Promise<TweetRes | undefined> {
  try {
    const tweets = await fetch(`${backendUrl}/api/v1/tweet/get?n=${pageNum}&s=${pageSize}`, {
      method: "GET",
      credentials: "include",
      next: { tags: ["tweets"] }
    })
    return tweets.json();
  } catch (e) {
    console.error(e)
    return undefined
  }
}
