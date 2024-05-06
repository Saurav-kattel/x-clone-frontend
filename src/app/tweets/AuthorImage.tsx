"use client"

import { useEffect, useState } from "react"
import { AuthorImageType, getAuthorImage } from "./getAuthorImage"

const AuthorImage = ({ userId, author }: { userId: string, author: string }) => {
  const [image, setImage] = useState<undefined | AuthorImageType>(undefined)
  const [loading, setLoading] = useState<boolean>()
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      getAuthorImage({ authorId: userId }).then((data) => {
        setImage(data)
        setLoading(false)
      }).catch((err) => {
        setImage(undefined)
        setLoading(false)
        console.log(err)
      })
    }, 200)
  }, [])
  return (
    <div>
      {
        loading ? "Loading" :

          <div className='flex justify-start items-center p-2'>
            {!image && < div className="rounded-[50%] flex justify-center items-center text-center w-[50px] bg-gray-200 h-[50px]">
              <span className="text-4xl text-slate-600 font-bold ">
                {author.slice(0, 1).toUpperCase()}
              </span>
            </div>
            }

            {image?.status != 200 && <div className="rounded-[50%] flex justify-center items-center text-center w-[50px] bg-gray-200 h-[50px]">
              <span className="text-4xl text-slate-600 font-bold ">
                {author.slice(0, 1).toUpperCase()}
              </span>
            </div>
            }
            {image && image.status == 200 && <div className="flex items-center justify-start ">
              <img
                height={50}
                width={50}
                className="w-[50px] h-[50px] rounded-full bg-contain object-fit"
                src={`data:image/jpeg;base64,${image.res.image}`}
              />
            </div>
            }
          </div>
      }
    </div>
  )
}

export default AuthorImage
