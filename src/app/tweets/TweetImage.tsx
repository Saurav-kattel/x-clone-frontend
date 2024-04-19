"use client"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/app/store'
import { getTweetImage } from '../redux/features/tweetImageSlice'

const TweetImage = ({ imageId }: { imageId: string }) => {
  const { image, loading } = useSelector((state: RootState) => state.tweetImg)
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    setTimeout(() => {
      dispatch(getTweetImage({ imageId }))
    }, 300)
  }, [])
  return (
    <div>
      {loading ? "Loading" : image && <img
        height={200}
        width={200}
        alt="tweet image"
        className="w-[55vw] h-[300px] rounded-sm bg-contain object-fit"
        src={`data:image/jpeg;base64,${image?.res.image}`}
      />
      }
    </div>
  )

}

export default TweetImage
