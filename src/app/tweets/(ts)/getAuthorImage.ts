import { backendUrl } from "@/lib/exportEnvs";

export type AuthorImageType = {
  status: number;
  res: {
    image?: string;
    message?: string;
  }
}
export async function getAuthorImage({ authorId }: { authorId: string }): Promise<AuthorImageType | undefined> {
  try {
    const res = await fetch(`${backendUrl}/api/v1/tweet/author/image?userId=${authorId}`);
    return await res.json();
  } catch (err) {
    console.log(err)
    return undefined
  }
}
