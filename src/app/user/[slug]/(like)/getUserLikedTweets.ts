import { backendUrl } from "@/lib/exportEnvs"
import type { TweetRes } from '@/app/actions/getTweetsData';
export async function getUserLikedTweets({
	userId, pageSize, pageNumber,
}: {
	userId: string;
	pageNumber: number;
	pageSize: number;
}): Promise<TweetRes | null> {
	try {
		const response = await fetch(`${backendUrl}/api/v1/user/tweet/liked?s=${pageSize}&n=${pageNumber}&u_id=${userId}`)
		const json = await response.json()
		return json
	} catch (e) {
		console.error(e)
		return null
	}
}
