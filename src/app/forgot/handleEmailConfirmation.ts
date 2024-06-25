"use client"
import { backendUrl } from "@/lib/exportEnvs";

export async function handleEmailConfirmation({ email }: { email: string }) {
	try {

		const res = await fetch(`${backendUrl}/api/v1/user/verify/email`, {
			method: "POST",
			credentials: "include",
			body: JSON.stringify({
				email
			})
		});
		return await res.json()
	} catch (e) {
		console.error(e)
		return undefined
	}
}
