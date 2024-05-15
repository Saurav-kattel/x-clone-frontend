"use server"
import { backendUrl } from "@/lib/exportEnvs"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export async function deleteTweet({ pId }: { pId: string }) {
  let data = await fetch(backendUrl + "/api/v1/tweet/delete", {
    method: "DELETE",
    headers: {
      auth_token_x_clone: cookies().get("auth_token_x_clone")?.value ?? ""
    },
    body: JSON.stringify({
      tweetId: pId
    })
  })

  if (data.ok) {
    revalidateTag("tweets")
  }
}


