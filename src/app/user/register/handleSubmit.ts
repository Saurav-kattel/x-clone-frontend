import { backendUrl } from "@/lib/exportEnvs";

export async function handleSubmit(data: {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  firstName: string;
  lastName: string;
}) {
  try {
    const response = await fetch(backendUrl + "/api/v1/user/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        username: data.username,
        confirm_password: data.confirmPassword,
        firstName: data.firstName,
        lastName: data.lastName,
      }),
    });
    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
  }
}
