"use client"
import React, { useEffect } from 'react'
import { UserDataRes } from '../profile/general/ProfileComponent'
import AuthorImage from '@/app/tweets/AuthorImage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { getMonth } from './getMonth'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/redux/app/store'
import { getFollowerData } from '@/app/redux/features/followerSlice'

const Header = ({ data }: { data: UserDataRes }) => {
  const fullName = data?.res.firstName.concat(" ").concat(data?.res.lastName) ?? ""
  const joinedOnYear = new Date(data?.res.createdAt ?? "").getFullYear()
  const joinedOnMonth = new Date(data?.res.createdAt ?? "").getMonth()

  const following = useSelector((state: RootState) => state.following)
  const dispatch = useDispatch<AppDispatch>();

  return (
    <section>
      <div className='p-2 flex gap-4 bg-[#000013] items-center justify-start'>
        <FontAwesomeIcon className='text-2xl' icon={faArrowLeft} />
        <h2 className='flex font-bold text-2xl'>{fullName}</h2>
      </div>
      <div className='p-2 '>
        <AuthorImage link={false} width={80} height={70} userId={data?.res.id ?? ""} author={fullName} />
        <h2 className='flex font-bold text-xl'>{fullName}</h2>
        <p className='text-[10px]  text-slate-300'>@{data?.res.username}</p>
        <div className='flex py-2  gap-2 justify-start items-center'>
          <FontAwesomeIcon icon={faCalendarAlt} className='text-slate-400 text-sm' />
          <span className='text-slate-400 text-center text-sm'>Joined on {getMonth({ month: joinedOnMonth })} {joinedOnYear}</span>
        </div>
        <div>

        </div>
      </div>
    </section>
  )
}

export default Header
