"use client"

import { useEffect, useState } from "react"
import { AuthorImageType, getAuthorImage } from "./getAuthorImage"
import Link from "next/link"

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
            {!image && < div className="rounded-[50%] flex justify-center items-center text-center w-[30px] bg-gray-200 h-[30px]">
              <span className="text-2xl text-slate-600 font-bold ">
                {author.slice(0, 1).toUpperCase()}
              </span>
            </div>
            }

            {image?.status != 200 && <Link href={'/user/' + author} className="rounded-[50%] flex justify-center items-center text-center w-[30px] bg-gray-200 h-[30px]">
              <span className="text-xl text-slate-600 font-bold ">
                {author.slice(0, 1).toUpperCase()}
              </span>
            </Link>
            }

            {image && image.status == 200 && <Link href={'/user/' + author} className="flex items-center justify-start ">
              <img
                height={30}
                width={30}
                className="w-[30px] h-[30px] rounded-full bg-contain object-fit"
                src={`data:image/jpeg;base64,${image.res.image}`}
              />
            </Link>
            }
          </div>
      }
    </div>
  )
}

export default AuthorImage
