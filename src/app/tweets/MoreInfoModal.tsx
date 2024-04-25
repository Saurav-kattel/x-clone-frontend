"use client"
import { backendUrl } from '@/lib/exportEnvs';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { SetStateAction } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/app/store';
import { getTweets } from '../redux/features/tweetsSlice';

const MoreInfoModal = ({ showModal, setShowModal, authorId, tweetId, userId, token }: { tweetId: string; token: string; authorId: string | undefined; userId: string | undefined; showModal: boolean, setShowModal: React.Dispatch<SetStateAction<typeof showModal>> }) => {
  const showDeleteOption = authorId === userId;

  const dispatch = useDispatch<AppDispatch>()

  function deleteTweet({ pId }: { pId: string }) {
    fetch(backendUrl + "/api/v1/tweet/delete", {
      method: "DELETE",
      headers: {
        auth_token_x_clone: token
      },
      body: JSON.stringify({
        tweetId: pId
      })
    }).then((res) => {
      if (res.ok) {
        dispatch(getTweets({ pageNum: 1, pageSize: 8 }))
      }

    }).then((err) => console.error(err))
  }

  return (
    <>
      {showModal && <div className='flex flex-col w-[20vw] shadow shadow-green-300 bg-[#000]  absolute border-[0.4px] border-[#000010]  rounded-xl p-4 box-border'>
        <div className='hover:cursor-pointer'>
          <span onClick={() => setShowModal(state => !state)}>X</span>
        </div>
        <div className='shadow p-4 '>
          {showDeleteOption && <div onClick={() => deleteTweet({ pId: tweetId })} className='flex gap-2 px-4 py-1 rounded-md items-center hover:bg-gray-800 hover:cursor-pointer hover:scale-110 transition-transform '>
            <FontAwesomeIcon icon={faTrash} /> <span className='px-2 py-1 text-md rounded-lg text-white'>delete</span>
          </div>}

        </div>
      </div>
      }
    </>)
}

export default MoreInfoModal
