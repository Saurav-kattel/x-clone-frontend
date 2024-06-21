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
import Reply from './(reply)/Reply'
import Like from './(like)/Like'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/redux/app/store'
import { getCoverImage } from '@/app/redux/features/coverImageSlice'
import EditModal from '../profile/general/EditModal'
import { getUserData } from '@/app/redux/features/userSlice'




function ValidUserComponent({ data, cookie, username }: { username: string; data: UserDataRes, cookie: string }) {
  const fullName = data?.res.firstName.concat(" ").concat(data?.res.lastName) ?? ""
  const joinedOnYear = new Date(data?.res.createdAt ?? "").getFullYear()
  const joinedOnMonth = new Date(data?.res.createdAt ?? "").getMonth()
  const { res: coverImage } = useSelector((store: RootState) => store.cover)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedPath, setSelectedPath] = useState("Post")
  const dispatch = useDispatch<AppDispatch>()
  const { res: userData } = useSelector((store: RootState) => store.user)

  useEffect(() => {
    dispatch(getCoverImage({ username: username }))

  }, [])
  useEffect(() => {
    if (!userData) {
      dispatch(getUserData({ cookie }))
    }
  }, [userData])

  return (
    <div>
      <div className='flex justify-center items-center'>
        {showEditModal && (username === userData?.res.username) && <div className='w-[90dvw]  h-[100vh]  top-0 z-30 absolute flex-col backdrop-blur flex justify-center items-center'>
          <EditModal data={data?.res!} cookies={cookie} setShowEditModal={setShowEditModal} />
        </div>}
      </div>
      <div className='p-2 flex gap-4 bg-[#000013] items-center justify-start'>
        <Link href={"/"}><FontAwesomeIcon className='text-2xl' icon={faArrowLeft} /></Link>
        <h2 className='flex font-bold text-2xl'>{fullName}</h2>
      </div>
      <div className='p-2 '>


        <div style={{
          backgroundImage: `url(data:image/jpeg;base64,${coverImage?.res.image ?? ""})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',

        }} className='py-6  flex justify-around items-center h-[30vh]'>

          <AuthorImage link={false} width={100} height={100} userId={data?.res.id ?? ""} author={fullName} />
          {username === userData?.res.username ? <div
            onClick={() => setShowEditModal((vis) => !vis)}
            className="border w-[10vw] text-center border-slate-700 text-white py-1 px-2 bg-slate-950 hover:cursor-pointer  hover:scale-110 rounded-lg"
          >
            Edit profile
          </div> : <div className='w-[20vw] bg-transparent'></div>}
        </div>
        <div className=' mt-5'>
          <h2 className='flex font-bold text-xl'>{fullName}</h2>
          <p className='text-[10px]  text-slate-300'>@{data?.res.username}</p>
          <div className='flex py-2  gap-2 justify-start items-center'>
            <FontAwesomeIcon icon={faCalendarAlt} className='text-slate-400 text-sm' />
            <span className='text-slate-400 text-center text-sm'>Joined on {getMonth({ month: joinedOnMonth })} {joinedOnYear}</span>
          </div>
          <div className='flex justify-start items-center gap-4'>
            <Link href={`/user/profile/relation/followers-${username}`}><Follower username={username} /></Link>
            <Link href={`/user/profile/relation/following-${username}`}> <Following username={username} /></Link>
          </div>
          <ProfileNav selectedPath={selectedPath} setSelectedPath={setSelectedPath} />

          {selectedPath === "Post" && <Suspense fallback={<Spinner />}><Post cookie={cookie} username={username} />  </Suspense>}
          {selectedPath === "Replies" && <Suspense fallback={<Spinner />}><Reply userId={data?.res.id ?? ""} cookie={cookie} />  </Suspense>}
          {selectedPath === "Likes" && <Suspense fallback={<Spinner />}><Like userId={data?.res.id ?? ""} cookie={cookie} />  </Suspense>}
        </div>
      </div>
    </div>
  )
}


function InvalidUserComp() {
  return <div>
    <div>
      <div className='p-2 flex gap-4 bg-[#000013] items-center justify-start'>
        <Link href={"/tweets"}><FontAwesomeIcon className='text-2xl' icon={faArrowLeft} /></Link>
        <h2 className='flex font-bold text-2xl'>@NoUserFound</h2>
      </div>
      <div className='p-2 '>
        <div className='py-6  h-[30vh]'>
          <AuthorImage link={false} width={100} height={100} userId={""} author="" />
        </div>
        <div className=' mt-5'>
          <h2 className='flex font-bold text-xl'>@NoUserFound</h2>
          <p className='text-[10px]  text-slate-300'>@NoUser</p>
          <div className='flex py-2  gap-2 justify-start items-center'>
            <FontAwesomeIcon icon={faCalendarAlt} className='text-slate-400 text-sm' />
            <span className='text-slate-400 text-center text-sm'>Joined on unknown</span>
          </div>
        </div>
      </div>
    </div>
  </div>

}
const Header = ({ data, cookie, username }: { username: string; data: UserDataRes, cookie: string }) => {
  if (data?.res.hasOwnProperty("message")) {
    return <InvalidUserComp />
  }
  return <ValidUserComponent data={data} cookie={cookie} username={username} />

}

export default Header
