"use client"
import React, { useEffect, useState } from 'react'
import AuthorImage from '../AuthorImage'
import CommnetInputBox from "../(comments)/CommentInputBox"
import Link from 'next/link'
import { ReplyData } from '../(ts)/getReplyData'
import { calculateTimeSpent } from '@/lib/getTimeSpent'
import ReplyBox from './ReplyBox'

const ReplyBoxItems = ({ data, cookie }: {
  data: ReplyData; cookie: string;
}) => {

  const [spentTime, setSpentTime] = useState("");
  const [refreshTime, setRefreshTime] = useState(false)
  const [showInputModal, setShowInputModal] = useState<boolean>(false)

  useEffect(() => {
    let intervalId = setInterval(() => {
      setRefreshTime((res) => !res)
    }, 1000)


    let time = calculateTimeSpent(data.created_at)
    setSpentTime(time)
    return () => {
      clearInterval(intervalId)
    }
  }, [refreshTime])

  return (
    <div className='ml-8  p-4 rounded-md'>

      <div className='flex gap-2 items-center'>
        <Link href={data.replied_from_username}><AuthorImage
          width={50}
          height={50}
          author={data.replied_from_username} userId={data.replied_from} /></Link>
        <h3 className='text-xl text-slate-400 font-bold'>{data.replied_from_username}</h3>
      </div>

      <div>
        <div className='text-[10px] ml-2 font-thin flex flex-wrap gap-1 text-slate-400'>
          <span className='font-semibold text-blue-400 hover:underline hover:cursor-pointer underline-offset-2'>
            {data.replied_from_username}
          </span>
          replied
          to
          <span className='text-blue-400 hover:underline hover:cursor-pointer underline-offset-2 font-semibold'>
            {data.replied_to_username}
          </span>

          <span>
            {spentTime} ago
          </span>
        </div>
      </div>

      <div>
        <p className='text-sm py-1 ml-4'>{data.reply}</p>
      </div>
      <button
        onClick={() => setShowInputModal((st) => !st)}
        className='text-[12px] border border-transparent text-slate-200 px-2 py-1 rounded-md hover:border-slate-300'>Reply</button>

      {showInputModal && <CommnetInputBox
        tweetId={data.tweet_id}
        authorId={data.replied_from}
        cookie={cookie}
        parentCommentId={data.id}
        commentId={data.comment_id}
      />
      }
      {showInputModal && <ReplyBox cookie={cookie} parentCommentId={data.id} commentId={data.comment_id} tweetId={data.tweet_id} />}
    </div>
  )
}

export default ReplyBoxItems
