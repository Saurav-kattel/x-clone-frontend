"use client"
import React, { SetStateAction, useEffect, useState } from 'react'
import { ReplyResponse, getReplyData } from '../(ts)/getReplyData'
import ReplyBoxItems from './ReplyBoxItems'



const ReplyBox = ({ cookie, parentCommentId, tweetId, commentId, setRefresh }: {
  cookie: string;
  parentCommentId: string | null;
  tweetId: string;
  commentId: string;
  setRefresh: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [data, setData] = useState<ReplyResponse>()
  useEffect(() => {
    getReplyData({ token: cookie, parentCommentId: parentCommentId, tweetId, commentId })
      .then((info) => setData(info))
  }, [])
  if (data && !data.res) {
    return <p>No replies</p>
  }
  return (
    <div className='flex flex-col gap-2'>
      {data && data.res && data?.res.map((items) => <ReplyBoxItems cookie={cookie} setRefresh={setRefresh} data={items} key={items.id} />)}
    </div>
  )
}

export default ReplyBox
