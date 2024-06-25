"use client"

import { useState } from "react"
import { handleEmailConfirmation } from "./handleEmailConfirmation"
import { useRouter } from "next/navigation"
import { ResponseType } from "../user/login/LoginForm"

export default function ConfirmEmailForm() {

  const [email, setEmail] = useState("")
  const [response, setResponse] = useState<ResponseType>()
  const router = useRouter()

  async function handleSaveClick(e: any) {
    e.preventDefault()
    const res = await handleEmailConfirmation({ email })
    if (res.status === 200) {
      setEmail("")
      router.push("/forgot/otp")
    }
    setResponse(res)
    setTimeout(() => {
      setResponse(undefined)
    }, 3000)
  }

  return <div className="flex flex-col justify-center items-center h-[100dvh]">
    <form onSubmit={handleSaveClick} className="flex bg-slate-950 rounded-md p-8 shadow shadow-slate-900 flex-col justify-center items-center gap-2">
      <h2 className="text-center text-wrap text-3xl">Confirm Your Email</h2>
      <label className="flex justify-center items-start flex-col">
        <span>Email</span>
        <input
          className="bg-transparent px-2 py-1 border-b-[1px] outline-none border-b-slate-700"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button
        onClick={handleSaveClick}
        className="text-white bg-green-700 text-center rounded-lg px-4 py-2 " type="submit">
        submit
      </button>
      <div className="h-[2vh] text-red-500">
        {(response && response.status !== 200) && <div className="text-wrap text-md">
          error: {response.res.message}
        </div>}
      </div>
    </form>
  </div>
}
