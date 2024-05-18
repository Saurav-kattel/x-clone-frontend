import { backendUrl } from "@/lib/exportEnvs";

export async function handleSubmit({ email, password, confirmPassword, username, firstName, lastName }: {
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
        email: email,
        password: password,
        username: username,
        confirm_password: confirmPassword,
        firstName: firstName,
        lastName: lastName,
      }),
    });
    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
  }
}
