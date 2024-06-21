import { TweetRes, Tweets } from "@/app/actions/getTweetsData";
import { VisType } from "@/app/home/Header";
import { backendUrl } from "@/lib/exportEnvs";


export async function getUserPost({ username, pageSize, pageNumber, cookie, vis = "public" }: { username: string; pageNumber: number; pageSize: number; cookie: string; vis: VisType }): Promise<TweetRes | null> {
	try {
		const response = await fetch(`${backendUrl}/api/v1/tweet/get?s=${pageSize}&n=${pageNumber}&u_name=${username}&vis=${vis}`, {
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
