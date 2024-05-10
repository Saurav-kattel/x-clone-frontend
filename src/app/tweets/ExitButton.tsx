import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { SetStateAction } from 'react'

const ExitButton = ({ setShowComment }: { setShowComment: React.Dispatch<SetStateAction<boolean>> }) => {
  return (
    <div onClick={() => setShowComment(state => !state)} >
      <FontAwesomeIcon icon={faX} className='hover:cursor-pointer font-bold text-slate-600' />
    </div>)
}

export default ExitButton
