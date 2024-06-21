"use client"
import { AppDispatch, RootState } from '@/app/redux/app/store'
import { clear, getFolloweeData } from '@/app/redux/features/followeeSlice'
import { handleFollow } from '@/app/tweets/(ts)/handleFollow'
import Spinner from '@/lib/Spinner'
import React, { SetStateAction, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function checkIsFollowing({ setIsFollowing, userId, data }: {
  userId: string;
  data: {
    user_id: string;
    username: string;
  }[] | undefined;
  setIsFollowing: React.Dispatch<SetStateAction<boolean>>
}) {

  if (!data) {
    setIsFollowing(false)
    return
  }

  const findUser = data.find(data => data.user_id === userId)
  setIsFollowing(findUser?.user_id != undefined)
}

const FollowButton = ({ userId, cookie, username }: { username: string; userId: string; cookie: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { res, loading } = useSelector((state: RootState) => state.following)
  const [isFollowing, setIsFollowing] = useState<boolean>(false)

  setTimeout(() => {
    checkIsFollowing({ setIsFollowing, userId, data: res?.res })
  }, 200)


  if (loading) {
    return <Spinner />
  }

  return (

    <button
      onClick={() => {
        handleFollow({ token: cookie, followeeId: userId })
        setTimeout(() => {
          dispatch(getFolloweeData({ username }))
          dispatch(clear())
        }, 100)
      }}

      className={`${isFollowing ? "hover: text-red-500 border border-transparent hover:border-red-500" : "hover: text-blue-500 border border-transparent hover:border-blue-500"} p-2 w-[8vw] rounded-md`}>{isFollowing ? "unfollow" : "follow"}</button >
  )
}

export default FollowButton
