"use client"

import { AppDispatch, RootState } from '@/app/redux/app/store'
import { getFolloweeData } from '@/app/redux/features/followeeSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Following = ({ username }: { username: string }) => {
  const following = useSelector((state: RootState) => state.following.res)
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getFolloweeData({ username }))
  }, [])
  return (
    <>
      <div className='cursor-pointer font-thin text-slate-300 hover:underline underline-offset-2'>
        <span>Following</span>
        <span> {following?.res ? following.res.length : 0}</span>
      </div>
    </>
  )
}

export default Following
