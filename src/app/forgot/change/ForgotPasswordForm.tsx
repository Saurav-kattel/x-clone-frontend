"use client"

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { updatePassword } from "./updatePassword"
import { useRouter } from "next/navigation"
import { ResponseType } from "@/app/user/login/LoginForm"

export default function ForgotPasswordForm({ changePasswordCookie }: { changePasswordCookie: string }) {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [response, setResponse] = useState<ResponseType>();

  const router = useRouter()


  async function handleSave(e: any) {
    e.preventDefault();
    const res = await updatePassword({ changePasswordToken: changePasswordCookie, confirmPassword, newPassword })
    if (res?.status === 200) {
      setNewPassword("")
      setConfirmPassword("")
      router.push("/tweets")
      router.refresh()
    }
    setResponse(res)
    setTimeout(() => {
      setResponse(undefined)
    }, 3000)
  }


  return <div className="flex justify-center items-center flex-col h-[100dvh]">
    <form onSubmit={handleSave} className=" p-8 shadow-slate-600 shadow rounded-lg justify-center items-center flex-col">
      <h2 className="text-center text-3xl text-white p-2 font-extrabold">Change Password</h2>
      <label>
        <div className="flex flex-col-reverse" >
          <div className="border border-transparent border-b-slate-700 ">
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type={`${showNewPassword ? "text" : "password"}`}
              className="bg-transparent text-md outline-none px-2" />
            <button type="button" onClick={() => setShowNewPassword(s => !s)}>
              {showNewPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </button>
          </div>
          <span className="text-md capitalize  text-start">New Password</span></div>
      </label>

      <label >
        <div className="flex flex-col-reverse" >
          <div className="border border-transparent border-b-slate-700 ">

            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={`${showConfirmPassword ? "text" : "password"}`}
              className="bg-transparent text-md  outline-none px-2" />
            <button type="button" onClick={() => setShowConfirmPassword(s => !s)}>
              {showConfirmPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </button>
          </div>
          <span className="text-md capitalize  text-start">Confirm Password</span></div>
      </label>
      <div className="flex justify-center items-center">
        <button type="submit" onClick={handleSave} className="bg-green-500 px-4 w-[20vw] py-2 text-center text-white rounded-md  border-none m-3">
          save
        </button>
      </div>
      <div className="h-[2vh] text-red-500">
        {(response && response.status !== 200) && <div className="text-wrap text-md">
          error: {response.res.message}
        </div>}
      </div>

    </form>

  </div>
}
