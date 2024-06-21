import { cookies } from "next/headers";

export default function getCookie(): string {
  return cookies().get("auth_token_x_clone")?.value ?? ""
}
