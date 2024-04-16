import { backendUrl } from "@/lib/exportEnvs";

export async function getAuthorImage({ userId }: { userId: string }): Promise<
  { status: number; res: { image: string } } | undefined> {
  try {
    const res = await fetch(backendUrl + "/api/v1/tweet/author/image?userId=" + userId, {
      method: "GET",
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error Author Image: ", err)
    return undefined
  }
}
