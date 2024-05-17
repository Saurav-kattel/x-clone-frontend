import React from 'react'
import { getUserInfo } from './getUserInfo'
import Header from './Header'
const page = async ({ params }: { params: { slug: string } }) => {
  const data = await getUserInfo({ username: params.slug })
  return (
    <div>
      <Header data={data} />
    </div>
  )
}

export default page
