import { cookies } from "next/headers";
import OtpForm from "./OtpForm";

export default function page() {
  const cookie = cookies().get("otp_auth_x_clone")?.value ?? ""
  return <div>
    <OtpForm otpAuth={cookie} />
  </div>
}
