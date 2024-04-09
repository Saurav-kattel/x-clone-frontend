import { backendUrl } from "@/lib/exportEnvs";
import { cookies } from "next/headers";

export async function getImageData() {
  try {
    const res = await fetch(backendUrl + "/api/v1/user/account/get-image", {
      credentials: "include",
      headers: {
        auth_token_x_clone: cookies().get("auth_token_x_clone")?.value ?? "",
      },
    });
    return await res.json();
  } catch (err) {
    console.error(err);
  }
}
