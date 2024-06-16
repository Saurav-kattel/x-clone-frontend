"use server";
import { backendUrl } from "@/lib/exportEnvs";

export async function handleProfileEdit({
  username,
  imageData,
  cover,
  cookies,
}: {
  username: string | undefined;
  imageData: FormData | undefined;
  cookies: string;
  cover?: boolean;
}): Promise<{ field: string; msg: string }[]> {
  try {
    const errors: { field: string; msg: string }[] = [];
    if (username) {
      const res = await fetch(backendUrl + "/api/v1/user/account/username", {
        method: "PUT",
        credentials: "include",
        headers: {
          auth_token_x_clone: cookies,
        },
        body: JSON.stringify({
          username,
        }),
      });

      const data = await res.json();
      if (data.status != 200) {
        errors.push({ field: "username", msg: data.res.message });
      }
    }



    if (imageData && !cover) {
      const res = await fetch(backendUrl + "/api/v1/user/account/image", {
        method: "POST",
        credentials: "include",
        headers: {
          auth_token_x_clone: cookies,
        },
        body: imageData,
      });
      const data = await res.json();
      if (data.status != 200) {
        errors.push({ field: "username", msg: data.res.message });
      }
    }

    if (imageData && cover) {
      const res = await fetch(backendUrl + "/api/v1/user/cover/image/post", {
        method: "POST",
        credentials: "include",
        headers: {
          auth_token_x_clone: cookies,
        },
        body: imageData,
      });
      const data = await res.json();
      if (data.status != 200) {
        errors.push({ field: "username", msg: data.res.message });
      }
    }

    return errors;
  } catch (err: any) {
    return [{ field: "fetch", msg: err.message }];
  }
}
