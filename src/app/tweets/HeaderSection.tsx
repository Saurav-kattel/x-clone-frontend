"use client"
import React, { SetStateAction, Suspense } from 'react'

const AuthorImage = React.lazy(() => import('./AuthorImage'))
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { Tweets } from '../actions/getTweetsData'
import SpentTimeComponent from './(comments)/SpentTimeComponent'
import Spinner from '@/lib/Spinner'

const HeaderSection = ({
  setShowModal,
  data,
}: {
  setClicked: React.Dispatch<SetStateAction<boolean>>;
  data: Tweets;
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <section className='flex lg:w-[38vw] md:w-[38vw]  justify-start items-center'>
      <div className='flex lg:w-[40vw] md:w-[40vw] justify-start items-center'>
        <Suspense fallback={<Spinner />}>
          <AuthorImage width={25} height={25} userId={data.userId} author={data.author_username} />
        </Suspense>
        <div className='text-white text-sm md:font-bold lg:font-bold md:text-md lg:text-md px-2 py-1'>
          {data.author}
        </div>
        <SpentTimeComponent pgTime={data.createdAt.toString()} />
      </div>
      <FontAwesomeIcon
        onClick={() => { setShowModal(state => !state) }}
        className='p-2 m-2 hover:scale-105 hover:cursor-pointer'
        icon={faEllipsisV} />
    </section>
  )
}

export default HeaderSection
