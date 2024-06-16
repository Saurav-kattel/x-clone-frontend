"use server"
import { backendUrl } from "@/lib/exportEnvs"

export interface NotificationData {
	id: string;
	recipient_id: string;
	recipient_username: string;
	recipient_email: string;
	recipient_image_id: string;
	recipient_created_at: Date;
	recipient_last_name: string;
	recipient_first_name: string;
	reciver_id: string;
	reciver_username: string;
	reciver_email: string;
	reciver_image_id: string;
	reciver_created_at: Date;
	reciver_last_name: string;
	reciver_first_name: string;
	message: string;
	status: string;
	created_at: Date;
	updated_at: Date;
	type: string;
	tweet_id: string;
}
export async function getNotification({ token }: { token: string }): Promise<{ status: number; res: NotificationData[] }> {

	const res = await fetch(`${backendUrl}/api/v1/notification/get`, {
		headers: {
			auth_token_x_clone: token
		},
		next: {

			tags: ["notification"],
		},
		cache: "no-cache"
	})

	const data = await res.json();
	return data;
}
