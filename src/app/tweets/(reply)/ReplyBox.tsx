"use client"
import React, { useEffect, useState } from 'react'
import { ReplyResponse, getReplyData } from '../(ts)/getReplyData'
import ReplyBoxItems from './ReplyBoxItems'



const ReplyBox = ({ cookie, parentCommentId, tweetId, commentId, tweetOwnerId }: {
  cookie: string;
  parentCommentId: string | null | undefined;
  tweetId: string;
  commentId: string;
  tweetOwnerId: string;
}) => {
  const [data, setData] = useState<ReplyResponse>()
  useEffect(() => {
    getReplyData({ token: cookie, parentCommentId: parentCommentId, tweetId, commentId })
      .then((info) => setData(info))
  }, [])

  if (data && !data.res) {
    return <p className='ml-8 text-[15px] text-slate-400'>No replies</p>
  }
  return (
    <div className='flex flex-col gap-2'>
      {data && data.res && data?.res.map((items) => <ReplyBoxItems tweetOwnerId={tweetOwnerId} cookie={cookie} data={items} key={items.id} />)}
    </div>
  )
}

export default ReplyBox
