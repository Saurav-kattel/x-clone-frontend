"use client"
import React, { useEffect, useState, useMemo } from 'react'
import { ReplyData } from '../getReplyData'
import AuthorImage from '../AuthorImage'
import CommnetInputBox from "../(comments)/CommentInputBox"
import ReplyBox from './ReplyBox'

const ReplyBoxItems = ({ data, cookie, setRefresh }: {
  data: ReplyData; cookie: string; setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}) => {

  const [spentTime, setSpentTime] = useState("");
  const [refreshTime, setRefreshTime] = useState(false)
  const [showInputModal, setShowInputModal] = useState<boolean>(false)

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
    let convertedTimeStamp = convertPgTimestampToMs(data.created_at)
    let time = calculateTimeSpent(convertedTimeStamp)
    setSpentTime(time)
    return () => {
      clearInterval(intervalId)
    }
  }, [refreshTime])


  return (
    <div className='  p-4 rounded-md'>
      <div className='flex gap-2 items-center'>
        <AuthorImage author={data.replied_from_username} userId={data.replied_from} />
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
        <p className='text-md text-slate-400 p-2'>{data.reply}</p>
      </div>
      <button
        onClick={() => setShowInputModal((st) => !st)}
        className='text-[12px] border border-transparent text-slate-200 px-2 py-1 rounded-md hover:border-slate-300'>Reply</button>
      {showInputModal && <CommnetInputBox
        tweetId={data.tweet_id}
        authorId={data.replied_from}
        cookie={cookie}
        parentCommentId={data.id}
        setRefresh={setRefresh}
        commentId={data.comment_id}
      />
      }

      {showInputModal && <ReplyBox
        cookie={cookie}
        setRefresh={setRefresh}
        parentCommentId={data.id}
        commentId={data.comment_id}
        tweetId={data.tweet_id} />}
    </div>
  )
}

export default ReplyBoxItems
