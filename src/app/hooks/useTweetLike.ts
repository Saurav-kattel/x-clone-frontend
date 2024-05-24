import { getLikeCount } from "../tweets/(ts)/getLikeCount"

export async function useTweetLikeCount({ tweetId }: { tweetId: string }): Promise<{ count: number; err?: any }> {
  try {
    let data = await getLikeCount(tweetId);
    if (data.res) {
      return { count: data.res }
    }
    return { count: 0 }
  } catch (e: any) {

    console.error(e)
    return { count: 0, err: e.message }
  }
}
