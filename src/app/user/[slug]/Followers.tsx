"use client"

import { AppDispatch, RootState } from '@/app/redux/app/store'
import { getFollowerData } from '@/app/redux/features/followerSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Followers = ({ username }: { username: string; }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getFollowerData({ username }))
  }, [])

  const { res: follower } = useSelector((state: RootState) => state.follower)
  return (
    <>
      <div className='cursor-pointer font-thin text-slate-300 hover:underline underline-offset-2'>
        <span>Follower</span>
        <span> {follower?.res ? follower.res.length : 0}</span>
      </div>
    </>
  )
}

export default Followers
