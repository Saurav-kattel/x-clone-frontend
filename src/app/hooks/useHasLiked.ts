import { getLikedUsers } from "../tweets/getLikedUser";
import { hasUserLiked } from "../tweets/hasUserLiked";


export async function useHasLiked({ tweetId, token, userId }: { userId: string; tweetId: string; token: string }): Promise<{ like: boolean, error?: string }> {
  try {
    const users = await getLikedUsers({ tweetId, token });
    const hasLiked = hasUserLiked({ data: users?.res, userId });
    return { like: hasLiked }

  } catch (err: any) {
    return { like: false, error: err.message }
  }
}
