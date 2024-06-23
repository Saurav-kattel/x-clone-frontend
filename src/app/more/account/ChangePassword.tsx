"use client"

import { useState } from "react"

export default function ChangePasswordComponent({ cookie }: { cookie: string }) {
  const [showModal, setShowModal] = useState(false)

  return <div>
    {showModal && <div className='w-[55dvw]  h-[100vh]  top-0 z-50 absolute flex-col backdrop-blur flex justify-center items-center'>
      <div className="bg-black rounded-xl shadow-white w-[50vw]  h-[50dvh] items-center justify-center">
        <button onClick={() => setShowModal(s => !s)} className="absolute top-0 left-0 px-4 text-2xl m-2  font-extrabold text-red-600 hover:scale-110">x</button>
        <div className="flex flex-col items-center justify-center">
          <form action="">
            <h2 className="text-xl text-white font-bold p-2">Change Password</h2>
            <label htmlFor="">
              <div className="flex flex-col-reverse">
                <input type="password" />

                <span className="text-md capitalize p-2 text-start">Old Password</span></div>
            </label>
            <label htmlFor="">
              <div className="flex flex-col-reverse" >
                <input type="password" />

                <span className="text-md capitalize p-2 text-start">New Password</span></div>
            </label>
            <label htmlFor="">
              <div className="flex flex-col-reverse" >
                <input type="password" />
                <span className="text-md capitalize p-2 text-start">Confirm Password</span></div>
            </label>
          </form>
          <button onClick={() => setShowModal(s => !s)} className=" px-4 text-md  text-red-600 hover:scale-110 border border-transparent rounded-xl hover:border-red-300">Cancel</button>
        </div>
      </div>
    </div>}


    <div className="border-y-[1px] border-slate-800 my-2">
      <button className="border-none w-[55dvw] text-start py-2 text-xl px-4 text-white hover:bg-gray-800" onClick={() => setShowModal(s => !s)}>
        <span>Change Password</span>
      </button>
    </div>
  </div>
}
