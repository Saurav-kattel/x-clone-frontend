'use client'
import React, { SetStateAction, useState } from 'react'
import { handlePostComment } from '../(ts)/handlePostComment';
const CommentInputBox = ({ tweetId, cookie, authorId = '', parentCommentId, setRefresh, commentId }: {
  authorId?: string;
  setRefresh: React.Dispatch<SetStateAction<boolean>>;
  tweetId: string; cookie: string; parentCommentId?: string | null
  commentId: string | null
}) => {
  const [comment, setComment] = useState<string>('')
  return (
    <div className='p-2'>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder='write your comment here'
        className='bg-transparent border-b-slate-600 min-h-[8vh] border-b-[1px] w-[25vw] resize-none p-2 outline-none text-sm' />
      <button
        onClick={() => {
          handlePostComment({
            comment,
            tweetId,
            cookie,
            parentCommentId,
            commentId,
            authorId
          })
          setComment("")
          setRefresh((st) => !st)
        }}
        className='hover:border-slate-600 border border-transparent rounded-lg py-1 m-2 px-2 text-center'> post</button>
    </div>
  )
}

export default CommentInputBox
