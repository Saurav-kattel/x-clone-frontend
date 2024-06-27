"use client"
import { faEarth, faTrash, faUserMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { SetStateAction, useEffect, useState } from 'react'
import { Tweets } from '../actions/getTweetsData';
import { handleFollow } from './(ts)/handleFollow';
import { checkIsFollowing } from './(ts)/checkIsFollowing';


const MoreInfoModal = ({ setShowVisModal, setShowDeleteModal, update, setShowModal, clicked, authorId, userId, token, data }: {
  data: Tweets;
  clicked: boolean;
  update: VoidFunction;
  token: string;
  authorId: string | undefined;
  userId: string | undefined;
  setShowModal: React.Dispatch<SetStateAction<boolean>>
  setShowDeleteModal: React.Dispatch<SetStateAction<boolean>>
  setShowVisModal: React.Dispatch<SetStateAction<boolean>>

}) => {
  const showDeleteOption = authorId === userId;
  const [followState, setFollowState] = useState<string>("");
  const [pending, setPending] = useState<boolean>(false)

  useEffect(() => {
    setPending(true)
    const timeOutId = setTimeout(() => {
      checkIsFollowing({ token, followeeId: data?.userId }).then((res) => {
        setFollowState(res.res)
        setPending(false)
      }).catch(err => {
        setPending(false)
        console.log(err)
      })
    }, 200)

    return () => {
      clearTimeout(timeOutId)
    }

  }, [clicked])



  return (
    <>
      <div className='flex flex-col  lg:w-[20vw] w-[70vw] shadow shadow-green-300 bg-[#000]  absolute border-[0.4px] border-[#000010]  rounded-xl p-4 box-border'>
        <div className='hover:cursor-pointer'>
          <span onClick={() => setShowModal(state => !state)}>X</span>
        </div>
        <div className='shadow p-4 flex flex-col flex-shrink justify-center items-center gap-2'>

          {showDeleteOption ? <div className='flex justify-center items-center flex-col' >
            <div onClick={() => setShowDeleteModal((s) => !s)} className='flex gap-2 px-4 py-1 justify-center  rounded-md border border-transparent items-center hover:border-red-600 hover:cursor-pointer hover:scale-110 transition-transform '>
              <FontAwesomeIcon className='text-red-500' icon={faTrash} /> <span className='px-2 py-1 text-md font-semibold text-red-500 rounded-lg '>Delete</span>
            </div>

            <div className='flex justify-center items-center gap-2 p-2 rounded-md cursor-pointer hover:scale-110 transition-all border-[1px] border-transparent hover:border-slate-400' onClick={() => setShowVisModal((s) => !s)}>
              <FontAwesomeIcon icon={faEarth} /> <span> Visbilility </span>
            </div>

          </div>
            : null}

          {data?.userId != userId && <div>
            <div
              onClick={() => {
                handleFollow({ token, followeeId: data?.userId }).then(() => {
                  update();
                })
              }}
              className='text-white w-[10vw] p-2  hover:bg-[#000010] 
            hover:cursor-pointer font-bold flex justify-center rounded-md  items-center gap-2 text-md '>
              {followState ? <FontAwesomeIcon icon={faUserMinus} /> : <FontAwesomeIcon icon={faUserPlus} />}
              <span className=" px-2 py-1 font-semibold rounded-2xl">{pending ? "....." : followState ? "unfollow" : "follow"}</span>
            </div>


          </div>}

        </div>
      </div>
    </>)
}

export default MoreInfoModal
