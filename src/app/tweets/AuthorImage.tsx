"use client"

import { useEffect, useState } from "react"
import { AuthorImageType, getAuthorImage } from "./(ts)/getAuthorImage"
import Link from "next/link"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"

const AuthorImage = ({ userId, author, link = true, width = 80, height = 80 }: { link?: boolean; width?: number; height?: number; userId: string, author: string }) => {
  const [image, setImage] = useState<undefined | AuthorImageType>(undefined)

  useEffect(() => {
    getAuthorImage({ authorId: userId })
      .then((data) => setImage(data))
      .catch((err) => {
        setImage(undefined)
        console.log(err)
      })
  }, [userId])

  const imageComponent = (
    <Image
      style={{ width: `${width}px`, height: `${height}px` }}
      fetchPriority="low"
      height={height}
      width={width}
      placeholder='blur'
      blurDataURL='https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png'
      alt="profile image"
      className={`bg-center rounded-[50px]`}
      src={`data:image/jpeg;base64,${image?.res.image}`}
    />
  )

  const placeholderComponent = (
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      className="rounded-full flex z-40 justify-center items-center text-center text-slate-400"
    >
      <FontAwesomeIcon icon={faUser} />
    </div>
  )

  return (
    <div className="flex justify-start items-center p-2">
      {link ? (
        <Link href={`/user/${author}`} className="flex items-center justify-start">
          {image?.status === 200 ? imageComponent : placeholderComponent}
        </Link>
      ) : (
        <div className="flex items-center justify-start">
          {image?.status === 200 ? imageComponent : placeholderComponent}
        </div>
      )}
    </div>
  )
}

export default AuthorImage
