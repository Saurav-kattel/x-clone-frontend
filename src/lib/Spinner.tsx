
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Spinner = ({ ref }: { ref?: any }) => {
  return (
    <FontAwesomeIcon ref={ref} icon={faSpinner} className='animate-spin w-6 h-6' />
  )
}

export default Spinner
