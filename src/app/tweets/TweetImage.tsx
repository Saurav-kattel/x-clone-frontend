"use client"
import { useEffect, useState } from 'react'
import { getTweetImage } from './getTweetImage'
import Image from "next/image"

const TweetImage = ({ imageId }: { imageId: string }) => {

  const [data, setData] = useState<{ status: number; res: { message?: string; image?: string } } | undefined>()
  useEffect(() => {
    getTweetImage({ imageId }).then((res) => {
      setData(res)
    })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      {imageId && data && <Image
        height={200}
        width={200}
        fetchPriority='low'
        alt="tweet image"
        className="w-[600px] h-[300px] rounded-sm bg-contain object-fit"
        src={`data:image/jpeg;base64,${data?.res.image}`}
      />
      }

      <span>{data?.status}</span>
    </div>
  )

}

export default TweetImage
