"use client"
import { AppDispatch, RootState } from '@/app/redux/app/store'
import { getFollowerData } from '@/app/redux/features/followerSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from './Card'

const Followers = ({ token }: { token: string }) => {
  const dispatch = useDispatch < AppDispatch > ()
  const { res } = useSelector((state: RootState) => state.follower)
  useEffect(() => {
    dispatch(getFollowerData({ cookie: token }))
  }, [])
  if (!res?.res) {
    return <div className=' flex items-center justify-center p-2 m-2 h-[60vh]'>
      <span className='font-semibold text-wrap'>You are not following any one</span>
    </div>
  }
  return (
    <div className='flex flex-col gap-1 p-2'>{
      res && res?.res.map((data: any) => <Card token={token} key={data.user_id} data={data} />)
    }</div>
  )
}

export default Followers
