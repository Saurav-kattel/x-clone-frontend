'use client'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'


const UserName = ({ username }: { username: string }) => {

  return (
    <>
      <Link href={'/user/' + username} className='p-2 text-2xl hover:cursor-pointer'>
        <FontAwesomeIcon icon={faArrowLeft} />
      </Link>
      <div className='font-bold text-3xl p-4 m-3 '>{username}</div>
    </>
  )
}

export default UserName
