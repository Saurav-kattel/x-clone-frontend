import { getLikedUsers } from "../tweets/(ts)/getLikedUser";
import { hasUserLiked } from "../tweets/(ts)/hasUserLiked";


export async function useHasLiked({ tweetId, token, userId }: { userId: string; tweetId: string; token: string }): Promise<{ like: boolean, error?: string }> {
  try {
    const users = await getLikedUsers({ tweetId, token });
    const hasLiked = hasUserLiked({ data: users?.res, userId });
    return { like: hasLiked }

  } catch (err: any) {
    return { like: false, error: err.message }
  }
}
