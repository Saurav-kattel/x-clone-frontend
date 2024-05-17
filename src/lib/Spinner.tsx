
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Spinner = () => {
  return (
    <FontAwesomeIcon icon={faSpinner} className='animate-spin w-6 h-6' />
  )
}

export default Spinner
