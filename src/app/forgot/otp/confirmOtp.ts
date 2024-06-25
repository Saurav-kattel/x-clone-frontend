"use client"
import { backendUrl } from "@/lib/exportEnvs"

export async function confirmOtp({ otp, otpAuth }: { otp: string, otpAuth: string }) {
	try {
		console.log(otpAuth)
		const res = await fetch(`${backendUrl}/api/v1/user/verify/otp`, {
			method: "POST",
			credentials: "include",
			headers: {
				otp_auth_x_clone: otpAuth
			},
			body: JSON.stringify({ otp })
		})
		let data = await res.json()
		return data;
	} catch (e) {
		console.error(e)
		return undefined
	}
}
