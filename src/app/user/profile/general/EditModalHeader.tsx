import React from "react";

export default function EditModalHeader({ setShowEditModal }: { setShowEditModal: React.Dispatch<React.SetStateAction<boolean>> }) {
  return <div className="font-semibold text-xl absolute top-2 flex items-center w-[50vw] justify-between">
    <span
      className="text-3xl hover:cursor-pointer hover:scale-110 mx-2 p-2 font-bold"
      onClick={() => setShowEditModal((res) => !res)}
    >
      X
    </span>
    <span className="p-2 mx-2">Edit profile</span>
    <div></div>
  </div>
}
