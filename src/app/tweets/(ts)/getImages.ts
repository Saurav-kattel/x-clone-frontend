import { backendUrl } from "@/lib/exportEnvs";

export async function getImage(imageId: string) {
  try {
    const image = await fetch(`${backendUrl}/api/v1/tweet/image?id=${imageId}`, {
      method: "GET",
    })

    return await image.json();
  } catch (err) {
    console.log(err)
    return undefined;
  }
}
