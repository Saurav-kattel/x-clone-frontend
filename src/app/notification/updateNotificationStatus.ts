"use server"
import { backendUrl } from "@/lib/exportEnvs"

export async function updateNotificationStatus({ id }: { id: string }) {
	try {
		const response = await fetch(`${backendUrl}/api/v1/notification/status/update?n_id=${id}`, {
			method: "PUT",
		})
		return await response.json()
	} catch (e) {
		console.error(e)
	}
}
