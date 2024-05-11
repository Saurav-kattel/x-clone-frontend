"use client"
import React, { useEffect, useState, useMemo } from 'react'
import { ReplyData } from './getReplyData'
import AuthorImage from './AuthorImage'

const ReplyBoxItems = ({ data }: { data: ReplyData }) => {

  const [spentTime, setSpentTime] = useState("");
  const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    let intervalId = setInterval(() => {
      setRefresh((res) => !res)
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
    console.log("fire")
    setSpentTime(time)
    return () => {
      clearInterval(intervalId)
    }
  }, [refresh])


  return (
    <div className='  p-4 border-[1px] border-slate-800 rounded-md'>
      <div className='flex gap-2 items-center'>
        <AuthorImage author={data.replied_from_username} userId={data.replied_from} />
        <h3 className='text-xl text-slate-400 font-bold'>{data.replied_from_username}</h3>
      </div>
      <div>
        <div className='text-sm font-thin flex flex-wrap gap-1 text-slate-400'>
          <span className='font-semibold '>
            {data.replied_from_username}
          </span>
          to
          <span className='font-semibold'>
            {data.replied_to_username}
          </span>
          on
          <span>
            {spentTime}
          </span>
        </div>
      </div>
      <div>
        <p className='text-md text-slate-400 p-2'>{data.reply}</p>
      </div>
    </div>
  )
}

export default ReplyBoxItems
