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
const TweetImage = React.lazy(() => import('./TweetImage'))

const TweetComponent = ({ data, token, commentVis = "USER" }: { data: Tweets; token: string; commentVis?: "ALL" | "USER" }) => {
  const { res: userData } = useSelector((state: RootState) => state.user)
  const [showModal, setShowModal] = useState<boolean>(false);
  const [clicked, setClicked] = useState(false)

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

    <div ref={ref} className={`flex transition flex-col justify-center m-2 w-[38vw] relative no-scroll-bar rounded-md p-2 items-center ${animation}`}>

      <HeaderSection setClicked={setClicked} data={data} setShowModal={setShowModal} />

      <div className='flex w-[40vw] justify-end items-center p-1'>
        {showModal && <MoreInfoModal
          update={update}
          clicked={clicked}
          data={data}
          token={token}
          tweetId={data.id}
          authorId={data.userId}
          userId={userData?.res.id}
          setShowModal={setShowModal} />
        }
      </div>

      <Link href={`/tweets/${data.id}`}>
        < div className='p-4 flex w-[40vw]  flex-col justify-center items-center text-wrap' >

          <p className='text-md p-2 flex items-start w-[35vw]'>
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
    </div >
  )
}

export default TweetComponent;
