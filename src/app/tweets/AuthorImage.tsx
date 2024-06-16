"use client"

import { useEffect, useState } from "react"
import { AuthorImageType, getAuthorImage } from "./(ts)/getAuthorImage"
import Link from "next/link"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"

const AuthorImage = ({ userId, author, link = true, width = 30, height = 30 }: { link?: boolean; width?: number; height?: number; userId: string, author: string }) => {
  const [image, setImage] = useState<undefined | AuthorImageType>(undefined)
  useEffect(() => {
    setTimeout(() => {
      getAuthorImage({ authorId: userId }).then((data) => {
        setImage(data)
      }).catch((err) => {
        setImage(undefined)
        console.log(err)
      })
    }, 200)
  }, [])
  return (
    <div>
      <div className='flex justify-start items-center p-2'>
        {link ? <>
          {image?.status != 200 && <Link href={'/user/' + author}
            style={{ width: `${width}px`, height: `${height}px` }}
            className="flex items-center justify-start ">
            <span className={`w-[${width}px] h-[${height}px] rounded-[50%] font-bold text-slate-400 object-fill`}
            >
              <FontAwesomeIcon icon={faUser} />
            </span>
          </Link>
          }

        </> : <>
          {image?.status != 200 && <div
            style={{ width: `${width}px`, height: `${height}px` }}
            className={`rounded-full flex justify-center items-center text-center`}>
            <FontAwesomeIcon icon={faUser} />
          </div>
          }  </>}

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

          </>}
      </div>
    </div>

  )
}

export default AuthorImage
