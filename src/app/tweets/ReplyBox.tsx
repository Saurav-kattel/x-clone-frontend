"use client"
import React, { useEffect, useState } from 'react'
import { ReplyResponse, getReplyData } from './getReplyData'
import ReplyBoxItems from './ReplyBoxItems'



const ReplyBox = ({ cookie, parentCommentId, tweetId, commentId }: {
  cookie: string
  parentCommentId: string | null
  tweetId: string
  commentId: string
  setShowComment: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [data, setData] = useState < ReplyResponse > ()
  useEffect(() => {
    getReplyData({ token: cookie, parentCommentId: null, tweetId, commentId })
      .then((info) => setData(info))
  }, [])
  return (
    <div className='flex flex-col gap-2'>
      {data && data?.res.map((items) => <ReplyBoxItems data={items} key={items.id} />)}
    </div>
  )
}

export default ReplyBox
