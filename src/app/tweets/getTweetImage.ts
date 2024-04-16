import { backendUrl } from "@/lib/exportEnvs";

export async function getTweetImage({ imageId }: { imageId: string }): Promise<{ status: number; res: { message?: string; image?: string } } | undefined> {
  try {
    const res = await fetch(backendUrl + "/api/v1/tweet/image?id=" + imageId, {
      method: "GET",
      credentials: "include"
    })
    const data = await res.json()
    return data;

  } catch (error: any) {
    return undefined
  }
}
