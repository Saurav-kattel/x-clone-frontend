import React from 'react'
import Followers from './Followers'
import { cookies } from 'next/headers'

const page = () => {
  const cookie = cookies().get("auth_token_x_clone")?.value || ''
  return (
    <div>
      <Followers token={cookie} />
    </div>
  )
}

export default page
