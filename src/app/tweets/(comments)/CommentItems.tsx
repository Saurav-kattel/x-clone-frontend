import React, { SetStateAction, useEffect, useState } from 'react'
import { CommentData } from '../getUserComments'
import AuthorImage from '../AuthorImage'
import CommentInputBox from './CommentInputBox';
import ReplyBox from '../(reply)/ReplyBox';
import Link from 'next/link';

type Params = {
  token: string;
  tweetId: string;
  parentCommentId: string | null
  showInputModal: boolean;
  setShowInputModal: React.Dispatch<SetStateAction<boolean>>
  setRefresh: React.Dispatch<SetStateAction<boolean>>
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
    <div className='ml-8 text-slate-400 text-md '>
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

function Footer({ tweetId, token, authorId, commentId, parentCommentId, showInputModal, setShowInputModal, setRefresh }: Params) {
  const [showReplyBox, setShowReplyBox] = useState(!showInputModal)
  const [showReplyData, setShowReplyData] = useState(false)
  return <div>
    <div className='flex justify-between items-center'>
      <button
        onClick={() => {
          setShowInputModal(st => !st)
          setRefresh((st => !st))
          setShowReplyBox((st) => !st)
        }}
        className='flex ml-4 rounded-md px-2 py-1 text-sm  hover:border-slate-400 border border-transparent'>Reply</button>
      <button
        onClick={() => {
          setShowReplyData(st => !st)
        }}
        className='text-sm text-blue-600 hover:underline'>view replies</button>
    </div>

    {showReplyBox && <CommentInputBox
      authorId={authorId}
      setRefresh={setRefresh}
      tweetId={tweetId}
      commentId={commentId}
      cookie={token}
      parentCommentId={parentCommentId} />}

    {showReplyData && <ReplyBox
      tweetId={tweetId}
      cookie={token}
      setRefresh={setRefresh}
      parentCommentId={null}
      commentId={commentId}
    />}
  </div>
}

const CommentItems = ({ data, token, showInputModal, setShowInputModal, setRefresh }: {
  data: CommentData, token: string; showInputModal: boolean;
  setShowInputModal: React.Dispatch<SetStateAction<boolean>>
  setRefresh: React.Dispatch<SetStateAction<boolean>>

}) => {
  const [refreshTime, setRefreshTime] = useState(false)
  const [spentTime, setSpentTime] = useState("")
  useEffect(() => {
    let intervalId = setInterval(() => {
      setRefreshTime((res) => !res)
    }, 1000)
    function convertPgTimestampToMs(pgTimestamp: string): number {
      const dateString = pgTimestamp.slice(0, pgTimestamp.indexOf("."));
      const dateObject = new Date(dateString);
      return dateObject.getTime();
    }



    function calculateTimeSpent(createdAtMs: number): string {
      const now = new Date().getTime();
      const timeDifference = now - createdAtMs;

      // Logic similar to your original `calculateTimeSpent` function
      if (timeDifference < 0) {
        return "Record is from the future"; // Handle potential future timestamps
      } else {
        const seconds = Math.floor(timeDifference / 1000);
        if (seconds < 60) {
          return `${seconds} seconds`;
        } else if (seconds < 3600) {
          return `${Math.floor(seconds / 60)} minutes`;
        } else if (seconds < 86400) {
          return `${Math.floor(seconds / 3600)} hours`;
        } else {
          return `${Math.floor(seconds / 86400)} days`;
        }
      }
    }
    let convertedTimeStamp = convertPgTimestampToMs(data.createdAt)
    let time = calculateTimeSpent(convertedTimeStamp)
    setSpentTime(time)
    return () => {
      clearInterval(intervalId)
    }
  }, [refreshTime])
  return (

    <div className='ml-6 flex flex-col p-2 rounded-md w-[30vw] items-start justify-center'>
      <div className='py-4 px-2 flex items-center justify-center'>
        <Link href={"/user/" + data.username}> <AuthorImage userId={data.userId} author='' /></Link>
        <p className='text-slate-400 font-bold text-xl p-2'>{data.username}</p>
        <p className='text-sm text-slate-500'>{spentTime} ago</p>
      </div>

      <CommentBody data={data} />
      <Footer
        tweetId={data.tweet_id}
        authorId={data.userId}
        setRefresh={setRefresh}
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
