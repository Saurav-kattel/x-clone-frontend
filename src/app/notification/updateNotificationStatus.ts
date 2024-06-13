"use server"
import { backendUrl } from "@/lib/exportEnvs"
import { revalidateTag } from "next/cache"

export async function updateNotificationStatus({ id }: { id: string }) {
	try {
		const response = await fetch(`${backendUrl}/api/v1/notification/status/update?n_id=${id}`, {
			method: "PUT",
		})
		console.log(await response.json())
		revalidateTag("notification")
		return await response.json()
	} catch (e) {
		console.error(e)
	}
}
