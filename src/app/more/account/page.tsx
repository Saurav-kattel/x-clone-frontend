import ChangePasswordComponent from "./ChangePassword"
import LogoutComponent from "./LogoutComponent"
import getCookie from "@/app/actions/getCookies"

export default function page() {
  const cookie = getCookie()
  return <div>
    <ChangePasswordComponent cookie={cookie} />
    <LogoutComponent />
  </div>
}
