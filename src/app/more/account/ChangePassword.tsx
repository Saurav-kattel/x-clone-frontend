"use client"

import { faEye, faEyeSlash, faKey, faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { updatePassword } from "./updatePassword"
import { ResponseType } from "@/app/user/login/LoginForm"

export default function ChangePasswordComponent({ cookie }: { cookie: string }) {

  const [res, setRes] = useState<ResponseType>()

  const [showModal, setShowModal] = useState(false)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")


  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)


  function resetRes() {
    setTimeout(() => {
      setRes(undefined)
    }, 2000)
  }

  async function handleSave(e: any) {
    e.preventDefault();
    const response = await updatePassword({ cookie, oldPassword, newPassword, confirmPassword })
    if (response.status === 200) {
      setRes({ status: 200, res: { message: "password updated successfully" } })
      setOldPassword("")
      setNewPassword("")
      setConfirmPassword("")
      resetRes()
    } else {
      setRes(response)
      resetRes()
    }
  }

  return <div>
    {showModal && <div className='w-[55dvw]  h-[100vh]  top-0 z-50 absolute flex-col backdrop-blur flex justify-center items-center'>
      <div className="bg-black rounded-xl shadow-white w-[50vw]  h-[70dvh] items-center justify-center">

        <button onClick={() => setShowModal(s => !s)} className="absolute top-0 left-0 px-4 text-2xl m-2  font-extrabold text-red-600 hover:scale-110">x</button>

        <div className="flex flex-col h-[70dvh] items-center justify-center">
          <form >
            <h2 className="text-2xl text-white font-bold p-2">Change Password</h2>
            <div className="flex gap-2 flex-col items-center justify-center p-2">
              <label >
                <div className="flex flex-col-reverse" >
                  <div className="border border-transparent border-b-slate-700 ">

                    <input
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      type={`${showOldPassword ? "text" : "password"}`}
                      className="bg-transparent text-md  outline-none px-2" />
                    <button type="button" onClick={() => setShowOldPassword(s => !s)}>
                      {showOldPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                    </button>
                  </div>
                  <span className="text-md capitalize  text-start">Old Password</span></div>
              </label>

              <label >
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
            </div>
          </form>
          <button type="submit" onClick={(e) => handleSave(e)} className=" bg-green-500 text-md  text-white hover:scale-110 border border-transparent rounded-md w-[20vw] my-2  hover:border-green-300 p-2 font-bold">Save</button>

          <button onClick={() => setShowModal(s => !s)} className="p-2  font-bold text-md text-white  bg-red-600 hover:scale-110  rounded-md w-[20vw]">Cancel</button>

          <div className={`h-[15vh] my-2  flex flex-col w-[45vw] px-4 py-2 ${res ? "bg-gray-900" : "bg-transparent"} rounded-lg`}>
            {res && <button className="w-[5vw]" onClick={() => setRes(undefined)}><FontAwesomeIcon icon={faX} /></button>}

            {res && res?.status === 200 && <div className="flex justify-center items-center">
              <span className="text-green-500 font-bold p-2 ">{res.res.message}</span>
            </div>}

            {res && res?.status !== 200 && <div className="flex flex-col justify-center items-center">
              <span className="font-bold text-red-500"> An Error Occured</span>
              <span className="text-red-500 font-bold p-2 ">{res?.res.message}</span>
            </div>}
          </div>

        </div>
      </div>
    </div>}


    <div className="border-y-[1px] border-slate-800 my-2">
      <button className="border-none flex gap-2 items-center w-[55dvw] text-start py-2 text-xl px-4 text-white hover:bg-gray-800" onClick={() => setShowModal(s => !s)}>
        <FontAwesomeIcon icon={faKey} />
        <span>Change Password</span>
      </button>
    </div>
  </div>
}
