import { backendUrl } from "@/lib/exportEnvs";

type Params = {
	commentId?: string;
	replyId?: string;
	token: string;
}

export async function deleteComment({ commentId, replyId, token }: Params) {
	try {
		const response = await fetch(`${backendUrl}/api/v1/tweet/comment/delete?c_id=${commentId}&r_id=${replyId}`, {
			method: "DELETE",
			headers: {
				auth_token_x_clone: token
			}
		})

		return await response.json()

	} catch (err: any) {

		console.error(err.message)
		return undefined;
	}
}
