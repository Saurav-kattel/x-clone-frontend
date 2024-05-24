"use client"
import { useEffect, useState } from 'react'
import { getImage } from './(ts)/getImages'
import Spinner from '@/lib/Spinner';


const TweetImage = ({ imageId, height = 80, width = 80 }: { imageId: string; height?: number; width?: number }) => {
  const [image, setImage] = useState<{ status: number; res: { image: string } } | undefined>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let tmId = setTimeout(async () => {
      setLoading(true)
      let data = await getImage(imageId);
      setImage(data);
      setLoading(false)
    }, 100)

    return () => {
      clearTimeout(tmId)
    }

  }, [])

  return (
    <div>
      {loading ? <div className="w-[35vw]  flex justify-center items-center h-[300px] rounded-sm"
      >
        <Spinner />
      </div> : image && <img
        alt="tweet image"
        height={height}
        width={width}
        fetchPriority='low'
        className={`w-[38vw] rounded-md bg-contain object-fit `}
        src={`data:image/jpeg;base64,${image?.res.image}`}
      />
      }
    </div>
  )

}

export default TweetImage
