"use server"
import { backendUrl } from "@/lib/exportEnvs";

export async function updatePassword({ cookie, oldPassword, newPassword, confirmPassword }: { cookie: string, oldPassword: string; newPassword: string; confirmPassword: string }) {
	try {
		const res = await fetch(backendUrl + "/api/v1/user/account/password", {
			method: "PUT",
			credentials: "include",
			headers: {
				auth_token_x_clone: cookie,
			},
			body: JSON.stringify({
				old_password: oldPassword,
				new_password: newPassword,
				confirm_password: confirmPassword,
			}),
		});

		const data = await res.json()

		return data;
	} catch (e) {
		console.error(e)
		return undefined
	}
}
