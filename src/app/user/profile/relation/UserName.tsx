'use client'
import { AppDispatch, RootState } from '@/app/redux/app/store'
import { getUserData } from '@/app/redux/features/userSlice'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const UserName = ({ token }: { token: string }) => {
  const { res } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!res?.res.username) {
      dispatch(getUserData({ cookie: token }))
    }
  }, [])
  return (
    <>
      <Link href={'/user/profile'} className='p-2 text-2xl hover:cursor-pointer'>
        <FontAwesomeIcon icon={faArrowLeft} />
      </Link>
      <div className='font-bold text-3xl p-4 m-3 '>{res?.res.username}</div>
    </>
  )
}

export default UserName
