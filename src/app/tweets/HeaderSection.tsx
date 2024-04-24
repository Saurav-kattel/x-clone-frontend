import React, { SetStateAction } from 'react'

const AuthorImage = React.lazy(() => import('./AuthorImage'))
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { Tweets } from '../redux/features/tweetsSlice'

const HeaderSection = ({ setShowModal, data }: { data: Tweets; setShowModal: React.Dispatch<SetStateAction<boolean>> }) => {
  return (

    <div className='flex w-[58vw] justify-start items-center'>
      <div className='flex w-[58vw] justify-start items-center'>
        <AuthorImage userId={data.userId} author={data.author} />
        <div className='text-white font-bold text-md px-2 py-1'>
          {data.author}
        </div>
      </div>
      <FontAwesomeIcon
        onClick={() => { setShowModal(state => !state) }}
        className='p-2 m-2 hover:scale-105 hover:cursor-pointer'
        icon={faEllipsisV} />
    </div>
  )
}

export default HeaderSection
