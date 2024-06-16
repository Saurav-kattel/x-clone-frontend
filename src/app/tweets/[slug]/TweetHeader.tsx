import React from 'react'
import AuthorImage from '../AuthorImage';
import { calculateTimeSpent } from '@/lib/getTimeSpent';

const TweetCard = ({ data }: { data: { status: number; res: any } }) => {

  const time = calculateTimeSpent(data.res.createdAt.toString())

  return (
    <div className='flex gap-2 items-center border-y-[1px] border-y-slate-500 py-2 my-2'>
      <div className='flex gap-2 items-center justify-start'>
        <AuthorImage link={true} height={70} width={70} userId={data.res.userId} author={data.res.author_username} />
        <div>
          <h2 className='text-2xl font-bold text-slate-400'>{data.res.author}</h2>
          <p className='text-[10px] font-light text-slate-400'>@{data.res.author_username}</p>
        </div>
      </div>
      <p className='text-[15px] font-thin text-slate-300 text-center px-4'>{time} ago</p>
    </div>
  )
}

export default TweetCard
