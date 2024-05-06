"use client"
import React, { SetStateAction, useEffect, useState } from 'react'

const AuthorImage = React.lazy(() => import('./AuthorImage'))
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { Tweets } from '../redux/features/tweetsSlice'
import { handleFollow } from './handleFollow'
import { checkIsFollowing } from './checkIsFollowing'

const HeaderSection = ({ update, setShowModal, data, userId, token, setClicked, clicked }: { update: VoidFunction; clicked: boolean; setClicked: React.Dispatch<SetStateAction<boolean>>; token: string; userId: string | undefined; data: Tweets; setShowModal: React.Dispatch<SetStateAction<boolean>>; }) => {
  const [followState, setFollowState] = useState<string>("");
  const [pending, setPending] = useState<boolean>(false)
  useEffect(() => {
    setPending(true)
    setTimeout(() => {
      checkIsFollowing({ token, followeeId: data.userId }).then((res) => {
        setFollowState(res.res)
        setPending(false)
      }).catch(err => {
        setPending(false)
        console.log(err)
      })
    }, 200)

  }, [clicked])
  return (
    <div className='flex w-[38vw] justify-start items-center'>
      <div className='flex w-[40vw] justify-start items-center'>
        <AuthorImage userId={data.userId} author={data.author} />
        <div className='text-white font-bold text-md px-2 py-1'>
          {data.author}
        </div>
        {data.userId != userId && <div
          onClick={() => {
            handleFollow({ token, followeeId: data.userId }).then(() => {
              update();
            })
          }}
          className='text-white font-bold text-md px-2 py-1'>
          <span className="bg-blue-600 px-2 py-1 hover:scale-110 hover:cursor-pointer font-semibold rounded-2xl">{pending ? "....." : followState ? "unfollow" : "follow"}</span>
        </div>}
      </div>
      <FontAwesomeIcon
        onClick={() => { setShowModal(state => !state) }}
        className='p-2 m-2 hover:scale-105 hover:cursor-pointer'
        icon={faEllipsisV} />
    </div>
  )
}

export default HeaderSection
