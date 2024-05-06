
"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


const route = [{
  name: "followers",
  path: '/user/profile/relation/followers'
}, {
  name: "following",
  path: "/user/profile/relation/following"
}
]


const Element = ({ elm }: { elm: { name: string, path: string } }) => {
  const path = usePathname()
  const active = path === elm.path
  return <Link className={`${active ? "text-blue-500 underline" : "hover:text-blue-500 hover:underline"}`} href={elm.path}>{elm.name}</Link>
}

const RelationNav = () => {
  return (
    < div className=' flex gap-2 items-center p-2 justify-evenly border-b-[1px] border-slate-400 '> {
      route.map((elm) => <Element elm={elm} key={elm.path} />)
    }</div >
  )
}

export default RelationNav
