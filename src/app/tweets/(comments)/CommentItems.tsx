import React, { SetStateAction, useEffect, useState } from 'react'
import AuthorImage from '../AuthorImage'
import CommentInputBox from './CommentInputBox';
import { calculateTimeSpent } from '@/lib/getTimeSpent';
import { CommentData } from '../(ts)/getUserComments';

type Params = {
  token: string;
  tweetId: string;
  parentCommentId: string | null
  showInputModal: boolean;
  setShowInputModal: React.Dispatch<SetStateAction<boolean>>
  authorId: string
  commentId: string
}

function CommentBody({ data }: { data: CommentData }) {
  const [comment, setComment] = useState(() => {
    if (data.comment.length <= 100) {
      return data.comment;
    }
    return data.comment.slice(0, 100).concat("...")
  })

  const [readMoreStatus, setReadMoreStatus] = useState<string>("Read More")
  return (
    <div className='ml-8  text-sm py-0 '>
      <p>{comment}</p>
      {data.comment.length > 100 && <button
        onClick={() => {
          setReadMoreStatus((state) => {
            if (state === "Read More") {
              setComment(data.comment)
              return "Read Less"
            }
            setComment(data.comment.slice(0, 100).concat("..."))
            return "Read More"
          })
        }}
        className='text-blue-500  text-sm hover:underline '
      >{readMoreStatus}</button>}
    </div>
  )
}

function Footer({ tweetId, token, authorId, commentId, parentCommentId, showInputModal, setShowInputModal }: Params) {
  const [showReplyBox, setShowReplyBox] = useState(!showInputModal)
  const [showReplyData, setShowReplyData] = useState(false)
  return <div>
    <div className='flex justify-between  w-[26dvw] items-center'>
      <button
        onClick={() => {
          setShowInputModal(st => !st)
          setShowReplyBox((st) => !st)
        }}
        className='flex ml-4 rounded-md px-2 py-1 text-sm  hover:border-slate-400 border border-transparent'>Reply</button>
      <button
        onClick={() => {
          setShowReplyData(st => !st)
        }}
        className='text-sm text-blue-600 hover:underline'>{!showReplyData ? "view replies" : "hide replies"}</button>
    </div>

    {showReplyBox && <CommentInputBox
      authorId={authorId}
      tweetId={tweetId}
      commentId={commentId}
      cookie={token}
      parentCommentId={parentCommentId} />}
  </div>
}

const CommentItems = ({ data, token, showInputModal, setShowInputModal }: {
  data: CommentData, token: string; showInputModal: boolean;
  setShowInputModal: React.Dispatch<SetStateAction<boolean>>

}) => {
  const [refreshTime, setRefreshTime] = useState(false)
  const [spentTime, setSpentTime] = useState("")

  useEffect(() => {
    let intervalId = setInterval(() => {
      setRefreshTime((res) => !res)
    }, 1000)

    let time = calculateTimeSpent(data.createdAt)
    setSpentTime(time)
    return () => {
      clearInterval(intervalId)
    }
  }, [refreshTime])
  return (

    <div className='ml-6 py-3 flex flex-col px-2 rounded-md w-[30vw] items-start justify-center'>
      <div className=' px-2 flex items-center justify-center'>
        <AuthorImage userId={data.userId} author={data.username} />
        <p className='text-slate-400 font-bold text-md p-2'>{data.username}</p>
        <p className='text-[14px] text-slate-500'>{spentTime} ago</p>
      </div>
      <CommentBody data={data} />

      <Footer
        tweetId={data.tweet_id}
        authorId={data.userId}
        showInputModal={showInputModal}
        token={token}
        setShowInputModal={setShowInputModal}
        parentCommentId={data.id}
        commentId={data.id}
      />
    </div>
  )
}

export default CommentItems
