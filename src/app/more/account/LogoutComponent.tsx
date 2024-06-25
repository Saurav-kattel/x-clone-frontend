"use client"
import { resetCoverImage } from "@/app/redux/features/coverImageSlice";
import { resetProfileImage } from "@/app/redux/features/profileImageSlice";
import { clear } from "@/app/redux/features/userSlice";
import { backendUrl } from "@/lib/exportEnvs";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function LogoutComponent() {
  const router = useRouter()
  const dispatch = useDispatch()
  async function handleLogoutClick() {
    try {
      let res = await fetch(backendUrl + "/api/v1/user/account/logout", {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        dispatch(resetProfileImage())
        dispatch(resetCoverImage())
        clear()
        router.push("/tweets")
        router.refresh()
      }
    } catch (e) {
      console.error(e)
    }
  }
  return <button onClick={handleLogoutClick} className="flex gap-2  border-y-[1px] border-slate-800 px-4 my-4 text-xl hover:bg-gray-800 w-[55dvw] py-2 items-center">
    <FontAwesomeIcon icon={faSignOut} />
    <span>Logout</span>
  </button>
}
