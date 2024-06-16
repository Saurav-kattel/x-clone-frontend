"use client"

import { useState } from "react";
import { handleProfileUpdate } from "./handleProfileUpdate";


const EditUserName = ({
  prevUserName,
  cookies,
  setResponse,
}: {
  prevUserName: string;
  cookies: string;
  setResponse: React.Dispatch<React.SetStateAction<any>>;
}) => {

  const [username, setUsername] = useState<string>(prevUserName);
  return <div className="flex items-center justify-center gap-2">
    <label className="flex flex-col p-5 justify-center items-start rounded-md gap-1">
      <span className="">Username</span>
      <input
        className="outline-none border-b-[1px] py-1 border-b-slate-700 bg-transparent"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </label>
    <button
      className="border-[1px] border-transparent hover:border-slate-600 p-2 rounded-md transition-all"
      onClick={() => {
        handleProfileUpdate({
          cookies,
          setResponse,
          username
        })
      }}
    >save</button>
  </div>
}

export default EditUserName;
