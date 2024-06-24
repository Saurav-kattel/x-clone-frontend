"use server"
import { backendUrl } from "@/lib/exportEnvs";
import { revalidateTag } from "next/cache";
import { VisType } from "./Header";
export async function handleCreateTweet({ form, token, content, vis }: { form: FormData | undefined; token: string, content: string | undefined, vis: VisType }) {
  try {
    if (!form) {
      form = new FormData();
    }

    form?.append("data", JSON.stringify({ content: content, visibility: vis }))

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
