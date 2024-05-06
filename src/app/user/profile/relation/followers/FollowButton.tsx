"use client"
import { AppDispatch, RootState } from '@/app/redux/app/store'
import { getFolloweeData } from '@/app/redux/features/followeeSlice'
import { handleFollow } from '@/app/tweets/handleFollow'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const FollowButton = ({ userId, cookie }: { userId: string; cookie: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { res, loading } = useSelector((state: RootState) => state.following)
  const [isFollowing, setIsFollowing] = useState<boolean>(false)
  useEffect(() => {
    dispatch(getFolloweeData({ cookie: cookie }))
  }, [])

  function checkIsFollowing({ userId, data }: {
    userId: string;
    data: {
      user_id: string; username: string
    }[] | undefined
  }) {
    if (!data) {
      setIsFollowing(false)
      return
    }
    const findUser = data.find(data => data.user_id === userId)
    setIsFollowing(findUser?.user_id != undefined)
  }

  setTimeout(() => {
    checkIsFollowing({ userId, data: res?.res })
  }, 200)


  if (loading) {
    return <button disabled >loading...</button >
  }

  return (
    <button
      onClick={() => {
        handleFollow({ token: cookie, followeeId: userId })
        setTimeout(() => {
          dispatch(getFolloweeData({ cookie: cookie }))
        }, 100)
      }}

      className={`${isFollowing ? "hover: text-red-500 border border-transparent hover:border-red-500" : "hover: text-blue-500 border border-transparent hover:border-blue-500"} p-2 w-[8vw] rounded-md`}>{isFollowing ? "unfollow" : "follow"}</button >
  )
}

export default FollowButton
