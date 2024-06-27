"use client"

import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "./deleteComment";
import { AppDispatch, RootState } from "@/app/redux/app/store";
import { faEllipsisVertical, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { refreshFunc } from "@/app/redux/features/commentSlice";
import { useEffect, useState } from "react";
import { getUserData } from "@/app/redux/features/userSlice";

const SideModal = ({ replyId, commentId, commenterId, tweetOwnerId, token }: { replyId?: string; commentId?: string; token: string; commenterId: string; tweetOwnerId: string }) => {

  function handleButtonClick() {
    deleteComment({ replyId, commentId, token }).then(() => dispatch(refreshFunc()))
  }

  const { res: userData } = useSelector((state: RootState) => state.user)
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch<AppDispatch>();
  const [renderModal, setRenderModal] = useState<boolean>(false)

  useEffect(() => {
    if (!userData) {
      dispatch(getUserData({ cookie: token }))
    }
    if (tweetOwnerId === userData?.res.id || commenterId === userData?.res.id) {
      setRenderModal(true)
    }
  }, [tweetOwnerId, commenterId])

  if (!renderModal) {
    return null
  }
  return <div>
    <div className='flex flex-col justify-start items-center'>
      <FontAwesomeIcon icon={faEllipsisVertical} onClick={() => setShowModal(s => !s)} className='cursor-pointer p-2' />
    </div>
    <div className="flex justify-end items-center">
      {showModal && <div className='absolute w-[50vw] lg:w-[10dvw] p-2 h-[15dvh] border-[1px] border-slate-800 bg-[#000005]  flex flex-col justify-center items-center rounded-md'>

        <button className="outline-none absolute left-2  top-1 hover:scale-105 text-slate-800 text-xl" onClick={() => setShowModal(s => !s)}>X</button>


        <div className='flex items-center justify-center p-2'>
          <div className='text-red-400' onClick={handleButtonClick}>
            <FontAwesomeIcon icon={faTrashCan} /> delete</div>
        </div>
      </div>
      }
    </div>
  </div>

}





export default SideModal;
