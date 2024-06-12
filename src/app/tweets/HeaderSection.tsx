"use client"
import React, { SetStateAction } from 'react'

const AuthorImage = React.lazy(() => import('./AuthorImage'))
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { Tweets } from '../actions/getTweetsData'
import SpentTimeComponent from './(comments)/SpentTimeComponent'

const HeaderSection = ({
  setShowModal,
  data,
}: {
  setClicked: React.Dispatch<SetStateAction<boolean>>;
  data: Tweets;
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <section className='flex w-[38vw] justify-start items-center'>
      <div className='flex w-[40vw] justify-start items-center'>
        <AuthorImage width={50} height={50} userId={data.userId} author={data.author_username} />
        <div className='text-white font-bold text-md px-2 py-1'>
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
