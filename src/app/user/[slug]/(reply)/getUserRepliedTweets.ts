import { backendUrl } from "@/lib/exportEnvs"
export async function getUserRepliedTweets({ userId, pageSize, pageNumber }: { userId: string; pageSize: number, pageNumber: number }) {
	try {
		const response = await fetch(`${backendUrl}/api/v1/user/tweet/reply?u_id=${userId}&n=${pageNumber}&s=${pageSize}`);
		const data = await response.json();
		return data;

	} catch (err) {
		console.error(err);

	}
}
