"use server"
import { backendUrl } from "@/lib/exportEnvs";
import { revalidateTag } from "next/cache";

export async function updatePostVis({ vis, tweet_id, cookie }: { vis: string; tweet_id: string; cookie: string }) {
	const res = await fetch(`${backendUrl}/api/v1/tweet/vis/update`, {
		method: "PUT",
		headers: {
			auth_token_x_clone: cookie,
		}, body: JSON.stringify({
			tweetId: tweet_id,
			visibility: vis
		})
	})

	const data = await res.json()
	revalidateTag("tweets")
	return data;
}
