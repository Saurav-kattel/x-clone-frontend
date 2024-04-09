import { backendUrl } from "@/lib/exportEnvs";
import { cookies } from "next/headers";
import { UserData } from "./BasicDetails";

export async function getUserData(): Promise<
  { status: number; res: UserData } | undefined
> {
  try {
    const data = await fetch(backendUrl + "/api/v1/user/get", {
      method: "GET",
      headers: {
        auth_token_x_clone: cookies().get("auth_token_x_clone")?.value ?? "",
      },
    });
    return data.json();
  } catch (error: any) {
    console.error(error.message);
  }
}
