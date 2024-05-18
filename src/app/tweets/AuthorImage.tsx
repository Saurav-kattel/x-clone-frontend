"use client"

import { useEffect, useState } from "react"
import { AuthorImageType, getAuthorImage } from "./getAuthorImage"
import Link from "next/link"
import Image from "next/image"

const AuthorImage = ({ userId, author, link = true, width = 30, height = 30 }: { link?: boolean; width?: number; height?: number; userId: string, author: string }) => {
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
            {!image && <div className={`rounded-[50%] flex justify-center items-center text-center w-[${width}px] bg-gray-200 h-[${height}px]`}>
              <span className="text-2xl text-slate-600 font-bold ">
                {author.slice(0, 1).toUpperCase()}
              </span>
            </div>
            }


            {link ? <>
              {image?.status != 200 && <Link href={'/user/' + author}
                style={{ width: `${width}px`, height: `${height}px` }}
                className={`rounded-full flex justify-center items-center text-center bg-gray-200 `}>
                <span className="text-xl text-slate-600 font-bold ">
                  {author.slice(0, 1).toUpperCase()}
                </span>
              </Link>
              }
            </> : <>
              {image?.status != 200 && <div
                style={{ width: `${width}px`, height: `${height}px` }}
                className={`rounded-full flex justify-center items-center text-center bg-gray-200 `}>
                <span className="text-xl text-slate-600 font-bold ">
                  {author.slice(0, 1).toUpperCase()}
                </span>
              </div>
              }


            </>

            }
            {image && image.status == 200 &&
              <>
                {link ?
                  <Link href={'/user/' + author} className="flex items-center justify-start ">

                    <Image
                      height={height}
                      width={width}
                      alt="profile image"
                      className={`w-[${width}px] h-[${height}px] rounded-[50%] object-fill`}
                      src={`data:image/jpeg;base64,${image.res.image}`}
                    />
                  </Link>
                  : <div className="flex items-center justify-start ">
                    <Image
                      height={height}
                      width={width}
                      alt="profile image"
                      className={`w-[${width}px] h-[${height}px] rounded-[50%]  object-fill`}
                      src={`data:image/jpeg;base64,${image.res.image}`}
                    />
                  </div>
                }
              </>
            }
          </div>
      }
    </div>
  )
}

export default AuthorImage
