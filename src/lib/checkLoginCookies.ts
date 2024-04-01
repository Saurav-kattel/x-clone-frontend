import { cookies } from "next/headers";

export function checkLoginCookie() {
  const cookieStore = cookies();

  return cookieStore.has("auth_token_x_clone");
}
