import React from 'react'
import { getUserInfo } from './getUserInfo'
import Header from './Header'
import { cookies } from 'next/headers'
const page = async ({ params }: { params: { slug: string } }) => {
  const data = await getUserInfo({ username: params.slug })
  const cookie = cookies().get("auth_token_x_clone")?.value ?? ""
  return (
    <div>
      <Header username={params.slug} cookie={cookie} data={data} />
    </div>
  )
}

export default page
