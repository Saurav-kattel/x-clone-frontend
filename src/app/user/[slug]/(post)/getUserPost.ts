import { backendUrl } from "@/lib/exportEnvs"
import type { TweetRes } from '@/app/actions/getTweetsData';
export async function getUserPost({
  username, pageSize, pageNumber, cookie
}: {
  username: string;
  pageNumber: number;
  cookie: string;
  pageSize: number;
}): Promise<TweetRes | null> {
  try {
    const response = await fetch(`${backendUrl}/api/v1/tweet/get?s=${pageSize}&n=${pageNumber}&u_name=${username}`, {
      headers: {
        auth_token_x_clone: cookie
      }
    })
    const json = await response.json()
    return json
  } catch (e) {
    console.error(e)
    return null
  }
}
