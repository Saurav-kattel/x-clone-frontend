"use client"

import { calculateTimeSpent } from "@/lib/getTimeSpent"
import { useEffect, useState } from "react"

const SpentTimeComponent = ({ pgTime }: { pgTime: string }) => {
  const [refreshTime, setRefreshTime] = useState(false)
  const [spentTime, setSpentTime] = useState("")


  useEffect(() => {

    let intervalId = setInterval(() => {
      setRefreshTime((res) => !res)
    }, 1000)

    let time = calculateTimeSpent(pgTime)
    setSpentTime(time)
    return () => {
      clearInterval(intervalId)
    }
  }, [refreshTime])
  return <p className='text-[14px] text-slate-500'>{spentTime} ago</p>
}

export default SpentTimeComponent;
