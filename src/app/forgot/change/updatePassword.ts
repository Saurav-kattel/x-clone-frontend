import { backendUrl } from "@/lib/exportEnvs";

export async function updatePassword({ confirmPassword, newPassword, changePasswordToken }: { confirmPassword: string; newPassword: string, changePasswordToken: string }) {
	try {
		const response = await fetch(`${backendUrl}/api/v1/user/account/forgot-password`, {
			method: "PUT",
			headers: {
				change_password_x_clone: changePasswordToken
			},
			credentials: "include",
			body: JSON.stringify({
				new_password: newPassword,
				confirm_password: confirmPassword,
			})
		})

		return await response.json()
	} catch (e) {
		console.error(e)
		return undefined
	}

}
