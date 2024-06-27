"use client"
import { useSelector } from "react-redux";
import AuthorImage from "../tweets/AuthorImage";
import { UserData } from "../user/profile/general/BasicDetails";
import { RootState } from "../redux/app/store";
import { checkIsFollowing } from "../tweets/(ts)/checkIsFollowing";
import { useEffect, useState } from "react";
import { handleFollow } from "../tweets/(ts)/handleFollow";

export default function UserCard({ item, token }: { item: UserData; token: string }) {
  const { res: userData } = useSelector((state: RootState) => state.user)
  const [click, setClick] = useState(false)
  const [followState, setFollowState] = useState(false)

  useEffect(() => {
    const tmId = setTimeout(() => {
      (async () => {
        const res = await checkIsFollowing({ token: token, followeeId: item.id })
        setFollowState(res.res)
      })()
    }, 200)

    return () => {
      clearTimeout(tmId)
    }
  }, [click])

  function handleClick() {
    handleFollow({ token, followeeId: item.id })
    setClick(s => !s)
  }

  return <section>
    <div className=" lg:w-[30vw] w-[80vw] flex items-center justify-between rounded-2xl p-2 ">

      <div className="flex items-center gap-1 lg:w-[15vw]">
        <AuthorImage width={50} height={50} userId={item.id} author={item.username} link={true} />
        <span className="text-sm lg:w-auto w-[30vw] text-slate-400 font-bold text-wrap overflow-ellipsis">{item.username}</span>
      </div>

      <div>{userData?.res.username !== item.username && <button onClick={handleClick}>{followState ? "unfollow" : "follow"} </button>}</div>


    </div>
  </section>
}
