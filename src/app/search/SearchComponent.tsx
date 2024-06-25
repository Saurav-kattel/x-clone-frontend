'use client'

import { useEffect, useState } from "react"
import { getSearchResult } from "./getSearchResult"
import { UserData } from "../user/profile/general/BasicDetails"
import UserCard from "./UserCard"

export default function SearchComponent({ cookie }: { cookie: string }) {
  const [query, setQuery] = useState("")
  const [data, setData] = useState<any>()

  useEffect(() => {
    let timeoutId: any;
    if (query !== "") {
      const fetchData = async () => {
        try {
          let res = await getSearchResult({ query })
          setData(res)
        } catch (error) {
          console.error("Error fetching search results:", error)
          setData(null)
        }
      }

      timeoutId = setTimeout(fetchData, 200)
    } else {
      setData(undefined)
    }
    return () => clearTimeout(timeoutId)
  }, [query])

  return <div className="flex items-center flex-col p-2">
    <div>
      <input placeholder="Search" className="outline-none border mt-4 border-slate-800 rounded-xl p-2  bg-transparent w-[35vw]" type="text" onChange={(e) => setQuery(e.target.value)} />
    </div>
    <div className="flex flex-col mt-6 items-center gap-4 justify-center">
      {data?.res ? data.res.map((item: UserData) => <UserCard key={item.id} item={item} token={cookie} />) : null}
    </div>
  </div>
}

