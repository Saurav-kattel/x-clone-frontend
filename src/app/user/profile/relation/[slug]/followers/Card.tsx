'use client'
import AuthorImage from '@/app/tweets/AuthorImage'
import React from 'react'
import FollowButton from './FollowButton';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/app/store';

const Card = ({ data, token, username }: { username: string; data: { username: string, user_id: string }; token: string }) => {
  const { res: userData } = useSelector((state: RootState) => state.user)
  return (
    <div>
      <div className='flex gap-2 justify-between items-center'>
        <div className='flex items-center gap-2'>
          <Link href={'/user/' + data.username}><AuthorImage userId={data.user_id} author={data.username} /></Link>
          <span className='font-bold text-xl'>{data.username}</span>
        </div>
        {data.username !== userData?.res.username && <FollowButton username={username} userId={data.user_id} cookie={token} />}
      </div>
    </div>
  )
}

export default Card
