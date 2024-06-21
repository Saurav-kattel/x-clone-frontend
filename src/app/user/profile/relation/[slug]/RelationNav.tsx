
"use client"
import React, { SetStateAction } from 'react'


const route = [{
  name: "Followers",
}, {
  name: "Following",
}
]


const Element = ({ elm, setSelectedRoute, selectedRoute }: { selectedRoute: string; setSelectedRoute: React.Dispatch<SetStateAction<string>>; elm: { name: string } }) => {
  return <div className={`${elm.name === selectedRoute ? "p-2 text-blue-700 underline underline-offset-2" : " "} cursor-pointer `} onClick={() => setSelectedRoute(elm.name)}> {elm.name}</div>

}

const RelationNav = ({ setSelectedRoute, selectedRoute }: { selectedRoute: string; setSelectedRoute: React.Dispatch<SetStateAction<string>>; }) => {
  return (
    < div className=' flex gap-2 items-center p-2 justify-evenly border-b-[1px] border-slate-400 '> {
      route.map((elm) => <Element selectedRoute={selectedRoute} setSelectedRoute={setSelectedRoute} elm={elm} key={elm.name} />)
    }</div >
  )
}

export default RelationNav
