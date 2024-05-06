"use client"
import { useEffect, useState } from 'react'
import { getImage } from './getImages'

const TweetImage = ({ imageId }: { imageId: string }) => {

  const [image, setImage] = useState<{ status: number; res: { image: string } } | undefined>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    setTimeout(async () => {
      let data = await getImage(imageId);
      setImage(data);
      setLoading(false)

    }, 300)
  }, [])

  return (
    <div>
      {loading ? "Loading" : image && <img
        height={60}
        width={60}
        alt="tweet image"
        className="w-[35vw] h-[300px] rounded-sm bg-contain object-fit"
        src={`data:image/jpeg;base64,${image?.res.image}`}
      />
      }
    </div>
  )

}

export default TweetImage
