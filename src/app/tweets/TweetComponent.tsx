"use client"

import React, { useCallback, useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { RootState } from '../redux/app/store'
import MoreInfoModal from './MoreInfoModal'
import HeaderSection from './HeaderSection'
import FooterSection from './FooterSection'
import { Tweets } from '../actions/getTweetsData'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import TweetImage from './TweetImage'
import DeleteConfirmationModal from './DeleteConfirmationModal'
import ChangeVisComponent from './ChangeVisComponent'
const TweetComponent = ({ data, token, commentVis = "USER" }: { data: Tweets; token: string; commentVis?: "ALL" | "USER" }) => {

  const { res: userData } = useSelector((state: RootState) => state.user)
  const [showModal, setShowModal] = useState<boolean>(false);
  const [clicked, setClicked] = useState(false)
  const [showVisModal, setShowVisModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const update = useCallback(() => {
    setClicked(state => !state)
  }, [])

  const { ref, inView } = useInView()
  const [animation, setAnimation] = useState("")

  useEffect(() => {
    if (inView) {
      setAnimation("animate-load")
    }
  }, [inView])

  return (
    <div className='flex justify-center  items-center flex-col'>

      {showDeleteModal && <div className='w-[100dvw]  h-[100vh]  top-0 lg:w-[100vw] z-50 absolute flex-col lg:backdrop-blur lg:bg-transparent bg-black flex justify-center items-center'>
        <DeleteConfirmationModal setShowDeleteModal={setShowDeleteModal} tweetId={data.id} imageId={data.imageId} />
      </div>}

      {showVisModal && <div className='w-[100dvw]  overflow-clip h-[100vh] top-0 z-50 absolute flex-col bg-black lg:bg-transparent lg:backdrop-blur flex justify-center items-center'>
        <ChangeVisComponent tweetId={data.id} token={token} dataVis={data.visibility} setShowVisModal={setShowVisModal} />
      </div>}


      <div ref={ref} className={`flex transition flex-col justify-center m-2 w-[90vw] lg:w-[38vw] relative no-scroll-bar rounded-md p-2 items-center ${animation}`}>

        <HeaderSection setClicked={setClicked} data={data} setShowModal={setShowModal} />
        <div className='flex lg:w-[40vw] w-[90vw] justify-end items-center p-1'>
          {showModal && <MoreInfoModal
            setShowDeleteModal={setShowDeleteModal}
            setShowVisModal={setShowVisModal}
            update={update}
            clicked={clicked}
            data={data}
            token={token}
            authorId={data.userId}
            userId={userData?.res.id}
            setShowModal={setShowModal} />
          }
        </div>

        <Link href={`/tweets/${data.id}`}>
          < div className='p-4 w-[70vw] flex md:w-[40vw]  lg:w-[40vw] flex-col justify-center items-center text-wrap' >

            <p className='text-md p-2  items-start  w-[70vw] flex md:w-[35vw]  lg:w-[35vw]'>
              {data.content}
            </p>

            <TweetImage imageId={data.imageId} />
          </div >
        </Link>
        {data && <FooterSection
          commentVis={commentVis}
          userId={userData?.res.id ?? ""}
          authorId={data.userId}
          tweetOwnerId={data.userId}
          tweetId={data.id}
          token={token} />
        }
      </div>
    </div >
  )
}

export default TweetComponent;
