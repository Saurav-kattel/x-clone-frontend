'use client'
import AuthorImage from '@/app/tweets/AuthorImage'
import React from 'react'
import FollowButton from './FollowButton';

const Card = ({ data, token }: { data: { username: string, user_id: string }; token: string }) => {
  return (
    <div>
      <div className='flex gap-2 justify-between items-center'>
        <div className='flex items-center gap-2'>
          <AuthorImage userId={data.user_id} author={data.username} /> <span className='font-bold text-xl'>{data.username}</span>
        </div>
        <FollowButton userId={data.user_id} cookie={token} />
      </div>
    </div>
  )
}

export default Card
