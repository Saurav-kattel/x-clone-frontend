import { backendUrl } from "@/lib/exportEnvs";

export type Tweets = {
  id: string;
  content: string;
  userid: string;
  imageId: string;
  createdAt: Date;
  author: string;
  updatedAt: Date;
}

export type TweetsRes = {
  status: number;
  res: Tweets[];
}
export async function getTweets(): Promise<TweetsRes | undefined> {
  try {
    const res = await fetch(backendUrl + "/api/v1/tweet/get?n=1&s=7", {
      method: "GET",
      credentials: "include"
    })

    const data = await res.json()
    return data

  } catch (err) {
    console.log(err)
    return undefined
  }
}
