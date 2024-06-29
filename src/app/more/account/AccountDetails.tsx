"use client"

import { RootState } from "@/app/redux/app/store";
import { faArrowLeft, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useSelector } from "react-redux";

export function AccountDetails() {
  const [showModal, setShowModal] = useState(false)

  const { res: userData } = useSelector((state: RootState) => state.user)
  const localDateString = new Date(userData?.res.createdAt.toString() ?? "").toLocaleString()
  return <div>
    {showModal && <div className='lg:w-[55dvw] w-[85vw] flex justify-center items-center h-[100vh] bg-[radial-gradient(#000020,#000010)] top-0 z-50 absolute flex-col' >

      <FontAwesomeIcon onClick={() => setShowModal(s => !s)} icon={faArrowLeft} className="text-4xl  cursor-pointer p-2 absolute top-0 left-0" />


      <div className="lg:w-[40vw] h-[50vh] w-[80vw] flex flex-col items-center overflow-clip justify-center rounded-md bg-white">
        <h1 className="p-2 text-4xl text-slate-900 font-extrabold"> Account Information</h1>
        <div>

          <h2 className="font-bold text-slate-900 text-xl"><span>Name:</span> {userData?.res.firstName.concat(" ").concat(userData.res.lastName)}</h2>
          <div className="flex  text-xl gap-2 items-center font-bold text-slate-900">
            <span>Username:</span>
            <span>@{userData?.res.username}</span>
          </div>

          <div className="flex  text-xl gap-2 items-center font-bold text-slate-900">
            <span>Email:</span>
            <span className="text-blue-500 ">{userData?.res.email}</span>
          </div>

          <div className="flex  text-xl gap-2 items-center font-bold text-slate-900">
            <span>Joined On: </span>
            <span>{localDateString}</span>
          </div>

        </div>
      </div>

    </div>}
    <div onClick={() => setShowModal(s => !s)} className="flex mt-2 border-y-[1px] border-y-slate-800 gap-2 items-center w-[55dvw] text-start py-2 text-xl px-4 text-white hover:bg-gray-800">
      <FontAwesomeIcon icon={faUserPlus} />
      <span>Account Information</span>
    </div>
  </div>
}
