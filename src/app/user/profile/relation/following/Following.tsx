"use client"
import { AppDispatch, RootState } from '@/app/redux/app/store'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from './Card'
import { getFolloweeData } from '@/app/redux/features/followeeSlice'

const Following = ({ token }: { token: string }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { res, loading } = useSelector((state: RootState) => state.following)
  useEffect(() => {
    dispatch(getFolloweeData({ cookie: token }))
  }, [])


  if (loading) {
    return <div className=' flex items-center justify-center p-2 m-2 h-[60vh]'>
      <span className='font-semibold text-wrap'>Loading...</span>
    </div>
  }

  if (res && !res.res) {
    return <div className=' flex items-center justify-center p-2 m-2 h-[60vh]'>
      <span className='font-semibold text-wrap'>You are not following any one</span>
    </div>
  }
  return (
    <div className='flex flex-col gap-1 p-2'>{
      res && res.res && res.res.map((data: any) => <Card token={token} key={data.user_id} data={data} />)
    }</div>
  )
}

export default Following
