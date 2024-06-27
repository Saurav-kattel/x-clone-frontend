"use client"
import React, { SetStateAction, useMemo, useState } from "react"
import { updatePostVis } from "./updatePostVis"
import { VisType } from "../home/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarth, faLock, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/app/store";
import { refreshTweets } from "../redux/features/tweetSlice";
import Spinner from "@/lib/Spinner";


function VisItems({ item, token, tweetId }: { item: { name: string; icon: any }; tweetId: string; token: string; }) {

  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>();

  function handleVisChange({ vis }: { vis: string }) {
    setLoading(true)
    updatePostVis({ tweet_id: tweetId, cookie: token, vis: vis }).then(() => {
      setTimeout(() => {
        dispatch(refreshTweets())
        setLoading(false)
      }, 100)
    })
  }

  return <button
    onClick={() => handleVisChange({ vis: item.name })}
    className='cursor-pointer bg-blue-600 px-4 py-2  w-[50vw] lg:w-[10vw] text-white hover:opacity-80 font-semibold rounded-xl text-md' key={item.name}>
    {loading ? <Spinner /> : <div className="flex gap-2 items-center justify-evenly">  <FontAwesomeIcon icon={item.icon} />
      <span>{item.name}</span> </div>}
  </button>
}



export default function ChangeVisComponent({ tweetId, token, dataVis, setShowVisModal }: { tweetId: string; token: string; dataVis: VisType, setShowVisModal: React.Dispatch<SetStateAction<boolean>> }) {

  const visOptions = [{ name: "public", icon: faEarth }, { name: "private", icon: faLock }, { name: "followers", icon: faUsers }].filter((item) => item.name != dataVis)


  return <div className="flex flex-col justify-center items-center bg-black lg:w-[40%] w-[70vw] p-5 rounded-lg shadow-md h-[50%]">
    <h2 className='text-xl font-bold text-blue-700 p-1 text-center text-wrap'>Change Post Visbility</h2>
    <p className="text-md text-slate-600 text-wrap text-left">Change who will be able to view the post</p>
    <div className='flex justify-center items-center flex-col gap-2 m-4 '>
      {visOptions.map((item) => <VisItems key={item.name} tweetId={tweetId} token={token} item={item} />)}
    </div>
    <button
      onClick={() => setShowVisModal(s => !s)}
      className="p-2 text-center border-[1px] rounded-lg border-transparent hover:border-red-500">Cancel</button>
  </div>
}
