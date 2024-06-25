import getCookie from "../actions/getCookies"
import ConfirmEmailForm from "./ConfirmEmailForm"
import ForgotPasswordForm from "./ForgotPasswordForm"

export default function page() {
  const cookie = getCookie()
  return <div>
    <ConfirmEmailForm />
  </div>
}
