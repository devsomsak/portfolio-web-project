import React, { ReactNode } from 'react'

function layout({children}:{children:ReactNode}) {
  return (
    <main className='auth'>{children}</main>
  )
}

export default layout