"use client"

import { AppDispatch, RootState } from '@/app/redux/app/store'
import { getFollowerData } from '@/app/redux/features/followerSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Followers = ({ cookies, userId }: { cookies: string, userId: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const follower = useSelector((state: RootState) => state.follower.res)
  useEffect(() => {
    dispatch(getFollowerData({ cookie: cookies, userId }))
  }, [])
  console.log("follower", follower)
  return (
    <>
      <div>
        <span>Follower</span>
        <span> {follower?.res ? follower.res.length : 0}</span>
      </div>
    </>
  )
}

export default Followers
