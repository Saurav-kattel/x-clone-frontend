import React, { SetStateAction } from 'react'

const ProfileNav = ({ selectedPath, setSelectedPath }: { selectedPath: string; setSelectedPath: React.Dispatch<SetStateAction<string>> }) => {

  const items: { name: string }[] = [
    {
      name: "Post",
    }, {
      name: "Replies"
    }, {
      name: "Likes"
    }
  ]
  return (
    <div className='flex gap-2 justify-between items-center  border-b-[1px] border-slate-800 py-2  text-slate-500'>
      {items.map((item) => <div key={item.name}
        className={`${item.name === selectedPath ? "text-slate-300  border-b-4 border-slate-300" : "border-transparent"}  border-b-4  hover:border-slate-300 hover:text-slate-300 font-semibold cursor-pointer`} onClick={() => setSelectedPath(item.name)}> {item.name}</div>)}
    </div>
  )
}

export default ProfileNav
