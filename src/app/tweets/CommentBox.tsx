import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { SetStateAction } from 'react'
//todo
type SetShowComment = React.Dispatch<SetStateAction<boolean>>
const CommentBox = ({ setShowComment }: { setShowComment: SetShowComment }) => {
  return (
    <div className='p-4 w-[30vw]'>
      <div onClick={() => setShowComment(state => !state)} >
        <FontAwesomeIcon icon={faX} className='hover:cursor-pointer' />
      </div>
      <div className='w-[30vw] bg-slate-800 p-2 '>CommentBox</div>
    </div>
  )
}

export default CommentBox
