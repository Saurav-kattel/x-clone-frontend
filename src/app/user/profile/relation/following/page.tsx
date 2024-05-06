import React from 'react'
import Following from './Following'
import { cookies } from 'next/headers'

const page = () => {
  const cookie = cookies().get("auth_token_x_clone")?.value || ''

  return (
    <div>
      <Following token={cookie} />
    </div>
  )
}

export default page
