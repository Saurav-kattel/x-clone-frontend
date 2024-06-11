'use client'
import React, { useState } from 'react'
import { handlePostComment } from '../(ts)/handlePostComment';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/app/store';
import { refreshFunc } from '@/app/redux/features/commentSlice';
const CommentInputBox = ({ tweetId, cookie, authorId = '', parentCommentId, commentId }: {
  authorId?: string;
  tweetId: string; cookie: string; parentCommentId?: string | null
  commentId: string | null
}) => {
  const [comment, setComment] = useState<string>('')
  const dispatch = useDispatch<AppDispatch>()
  console.log(parentCommentId)
  return (
    <div className='flex justify-center items-center'>
      <div className=' bg-slate-950 rounded-3xl flex justify-center items-center w-[30vw]'>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className='bg-transparent min-h-[4vh] w-[inherit] flex-shrink resize-none px-2 py-3 outline-none text-sm' />
        <button
          onClick={() => {
            dispatch(refreshFunc())
            handlePostComment({
              comment,
              tweetId,
              cookie,
              parentCommentId,
              commentId,
              authorId
            })
            setComment("")
          }}
          className='hover:border-slate-600 border border-transparent rounded-lg py-1 m-2 px-2 text-center'> post</button>
      </div>
    </div>
  )
}

export default CommentInputBox
