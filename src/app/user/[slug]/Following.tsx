"use client"

import { AppDispatch, RootState } from '@/app/redux/app/store'
import { getFolloweeData } from '@/app/redux/features/followeeSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Following = ({ cookies, userId }: { cookies: string, userId: string }) => {
  const following = useSelector((state: RootState) => state.following.res)
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getFolloweeData({ cookie: cookies, userId }))
  }, [])
  console.log("following", following)
  return (
    <>
      <div>
        <span>Following</span>
        <span> {following?.res ? following.res.length : 0}</span>
      </div>
    </>
  )
}

export default Following
