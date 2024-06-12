"use client"
import React, { useState } from 'react'
import AuthorImage from '../AuthorImage'
import CommnetInputBox from "../(comments)/CommentInputBox"
import Link from 'next/link'
import { ReplyData } from '../(ts)/getReplyData'
import ReplyBox from './ReplyBox'
import SpentTimeComponent from '../(comments)/SpentTimeComponent'
import SideModal from '../(comments)/SideModal'

const ReplyBoxItems = ({ data, cookie, tweetOwnerId }: {
  data: ReplyData; cookie: string; tweetOwnerId: string;
}) => {

  const [showInputModal, setShowInputModal] = useState<boolean>(false)
  const [showReply, setShowReply] = useState(false)


  return (
    <div className='ml-4 border-l-white border-l-[1px] p-4'>

      <div className='flex gap-2 items-center'>
        <Link href={data.replied_from_username}><AuthorImage
          width={50}
          height={50}
          author={data.replied_from_username} userId={data.replied_from} /></Link>
        <h3 className='text-xl text-slate-400 font-bold'>{data.replied_from_username}</h3>
        <SideModal replyId={data.id} token={cookie} commenterId={data.replied_from} tweetOwnerId={tweetOwnerId} />
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
            <SpentTimeComponent pgTime={data.created_at} />
          </span>
        </div>
      </div>

      <div>
        <p className='text-sm py-1 ml-4'>{data.reply}</p>
      </div>
      <div className='flex gap-2 justify-between items-center'>
        <button
          onClick={() => setShowInputModal((st) => !st)}
          className='text-sm border border-transparent text-slate-200 px-2 py-1 rounded-md hover:border-slate-300'>Reply</button>

        <div className='text-sm text-blue-600 hover:underline cursor-pointer' onClick={() => setShowReply(!showReply)}>{showReply ? "hide reply" : "view reply"}</div>
      </div>

      {showInputModal && <CommnetInputBox
        tweetId={data.tweet_id}
        authorId={data.replied_from}
        cookie={cookie}
        parentCommentId={data.id}
        commentId={data.comment_id}
      />
      }
      {showReply && <ReplyBox tweetId={data.tweet_id} tweetOwnerId={tweetOwnerId} commentId={data.comment_id} cookie={cookie} parentCommentId={data.id} />}
    </div>
  )
}

export default ReplyBoxItems
