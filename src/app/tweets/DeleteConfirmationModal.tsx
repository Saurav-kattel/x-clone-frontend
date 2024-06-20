'use client'

import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/app/store";
import { refreshTweets } from "../redux/features/tweetSlice";
import { deleteFromImageChache } from "./filterCache";
import { deleteTweet } from "./(ts)/deleteTweet";

const DeleteConfirmationModal = ({ tweetId, setShowDeleteModal, imageId }: { imageId: string; tweetId: string; setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const dispatch = useDispatch<AppDispatch>();

  function deleteClicked() {
    deleteTweet({ pId: tweetId })
    deleteFromImageChache({ imageId: imageId })
    dispatch(refreshTweets())
  }


  return (
    <div className='p-4 w-[40%] bg-black h-[50%] grid place-items-center shadow-md rounded-lg'>
      <p className='text-xl font-extrabold text-red-500 text-wrap text-center p-4 '>Do you really want to delete this tweet?</p>
      <p className="w-[90%] text-slate-700 px-2  py-4 text-left">This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from search results. </p>
      <div onClick={deleteClicked}
        className='flex gap-2 p-2 bg-red-700  w-[80%]  justify-center  rounded-xl border border-transparent items-center hover:border-red-600 hover:cursor-pointer hover:scale-110 transition-transform '>
        Delete
      </div>
      <div onClick={() => setShowDeleteModal((s) => !s)}
        className='flex gap-2 p-2 w-[80%]  justify-center  rounded-xl border border-transparent items-center hover:border-red-600 hover:cursor-pointer hover:scale-110 transition-transform '>
        Cancel
      </div>
    </div>
  )
}
export default DeleteConfirmationModal;
