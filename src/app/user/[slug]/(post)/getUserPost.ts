import { backendUrl } from "@/lib/exportEnvs"

export async function getUserPost({
  username, pageSize, pageNumber, cookie
}: {
  username: string;
  pageNumber: number;
  cookie: string;
  pageSize: string;
}) {
  try {
    const response = await fetch(`${backendUrl}/api/v1/tweet/get?s=${pageSize}&n=${pageNumber}&u_name=${username}`, {
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
