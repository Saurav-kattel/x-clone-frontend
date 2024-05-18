"use client"
import React, { Suspense, useEffect, useState } from 'react'
import { UserDataRes } from '../profile/general/ProfileComponent'
import AuthorImage from '@/app/tweets/AuthorImage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { getMonth } from './getMonth'
import Following from "./Following"
import Follower from "./Followers"
import ProfileNav from './ProfileNav'
import Post from './(post)/Post'
import Spinner from '@/lib/Spinner'
import Link from 'next/link'

const Header = ({ data, cookie, username }: { username: string; data: UserDataRes, cookie: string }) => {
  const fullName = data?.res.firstName.concat(" ").concat(data?.res.lastName) ?? ""
  const joinedOnYear = new Date(data?.res.createdAt ?? "").getFullYear()
  const joinedOnMonth = new Date(data?.res.createdAt ?? "").getMonth()
  const [selectedPath, setSelectedPath] = useState("Post")
  return (
    <section>
      <div className='p-2 flex gap-4 bg-[#000013] items-center justify-start'>
        <Link href={"/"}><FontAwesomeIcon className='text-2xl' icon={faArrowLeft} /></Link>
        <h2 className='flex font-bold text-2xl'>{fullName}</h2>
      </div>
      <div className='p-2 '>
        <AuthorImage link={false} width={100} height={100} userId={data?.res.id ?? ""} author={fullName} />
        <h2 className='flex font-bold text-xl'>{fullName}</h2>
        <p className='text-[10px]  text-slate-300'>@{data?.res.username}</p>
        <div className='flex py-2  gap-2 justify-start items-center'>
          <FontAwesomeIcon icon={faCalendarAlt} className='text-slate-400 text-sm' />
          <span className='text-slate-400 text-center text-sm'>Joined on {getMonth({ month: joinedOnMonth })} {joinedOnYear}</span>
        </div>
        <div className='flex justify-start items-center gap-4'>
          <Follower userId={data?.res.id} cookies={cookie} />
          <Following userId={data?.res.id} cookies={cookie} />
        </div>
        <ProfileNav selectedPath={selectedPath} setSelectedPath={setSelectedPath} />

        {selectedPath === "Post" && <Suspense fallback={<Spinner />}><Post cookie={cookie} username={username} />  </Suspense>
        }
      </div>
    </section>
  )
}

export default Header
