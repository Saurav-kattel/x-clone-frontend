"use client"

import { useCallback, useState } from "react";
import { VisType } from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faX } from "@fortawesome/free-solid-svg-icons";

function SelectVisibilityComponent({ visibility, setVisibility }: { visibility: VisType, setVisibility: React.Dispatch<React.SetStateAction<VisType>> }) {

  const [showModal, setShowModal] = useState(false)


  function RadioItems({ value, handleChange, visibility }: {
    value: string; handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void; visibility: VisType
  }) {
    return <label className="flex flex-wrap items-center justify-center gap-2 ">
      <input
        type="radio"
        name="vis"
        value={value}
        checked={visibility === value}
        onChange={(e) => {
          handleChange(e)
          setShowModal(s => !s)
        }
        }
      />
      <span className={`text-md capitalize p-2 ${visibility === value ? "text-blue-600" : "text-slate-600"}`}>{value}</span>
    </label>


  }


  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setVisibility(event.target.value as VisType)
  }, [visibility])

  const radioList = [
    { value: "public", visibility, handleChange },
    { value: "private", visibility, handleChange },
    { value: "followers", visibility, handleChange }
  ]
  return <div>
    <h2 className="text-md text-blue-600 p-1 font-extrabold cursor-pointer "
      onClick={() => setShowModal(!showModal)}>
      {showModal ?
        <FontAwesomeIcon className="text-xl font-extrabold p-2 cursor-pointer" icon={faX} />
        :
        <FontAwesomeIcon icon={faEye} className="text-xl" />}
    </h2>

    {showModal && <div className="flex flex-wrap gap-2 justify-center items-center p-2 ">
      {radioList.map((item) => <RadioItems
        key={item.value} value={item.value}
        visibility={item.visibility}
        handleChange={item.handleChange}
      />)}
    </div>}

  </div>
}
export default SelectVisibilityComponent;
