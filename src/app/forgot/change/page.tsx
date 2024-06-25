import { cookies } from "next/headers";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default function page() {
  const cookie = cookies().get("change_password_x_clone")?.value ?? ""
  return <div>
    <ForgotPasswordForm changePasswordCookie={cookie} />
  </div>
}
