'use client'
import { AppDispatch } from '@/app/redux/app/store';
import { clear, getFolloweeData } from '@/app/redux/features/followeeSlice';
import { handleFollow } from '@/app/tweets/(ts)/handleFollow';
import AuthorImage from '@/app/tweets/AuthorImage'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

const Card = ({ data, token, loggedUsername }: { data: { username: string, user_id: string }; token: string; loggedUsername: string }) => {


  const [followState, setFollowState] = useState("following")
  const dispatch = useDispatch<AppDispatch>();


  return (
    <div>
      <div className='flex gap-2 justify-between items-center'>
        <div className='flex items-center gap-2'>
          <AuthorImage userId={data.user_id} author={data.username} />
          <span className='font-bold text-2xl'>{data.username}</span>
        </div>
        {loggedUsername != data.username && <button
          onClick={() => {
            handleFollow({ token, followeeId: data.user_id })
            setTimeout(() => {
              dispatch(getFolloweeData({ username: loggedUsername }))
              clear()
            }, 100)
          }}
          onMouseEnter={() => { setFollowState("unfollow") }}
          onMouseLeave={() => { setFollowState("following") }}
          className={`p-1 border rounded-lg w-[8vw] ${followState === 'unfollow' ? "border-red-500 text-red-500" : null}`}>{followState}
        </button>}
      </div>
    </div>
  )
}

export default Card
