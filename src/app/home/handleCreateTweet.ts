"use server"
import { backendUrl } from "@/lib/exportEnvs";
import { revalidateTag } from "next/cache";
export async function handleCreateTweet({ form, token, content }: { form: FormData | undefined; token: string, content: string | undefined }) {
  try {


    form?.append("data", JSON.stringify({ content: content }))

    const res = await fetch(backendUrl + "/api/v1/tweet/post", {
      method: "POST",
      credentials: "include",
      headers: {
        auth_token_x_clone: token,
      },
      body: form
    })
    const json = await res.json();
    revalidateTag("tweets")
    return json;
  } catch (err) {
    console.log(err)
  }
}
