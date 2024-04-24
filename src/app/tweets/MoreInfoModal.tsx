"use client"
import React, { SetStateAction } from 'react'

const MoreInfoModal = ({ showModal, setShowModal }: { showModal: boolean, setShowModal: React.Dispatch<SetStateAction<typeof showModal>> }) => {
  return (
    <>
      {showModal && <div className='flex flex-col w-[10vw] h-[10vw] absolute justify-center items-center rounded-xl p-4 box-border'>
        <span onClick={() => setShowModal(state => !state)}>X</span>
      </div>}
    </>)
}

export default MoreInfoModal
