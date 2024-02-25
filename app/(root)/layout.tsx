import React, { ReactNode } from 'react'
import Sidebar from '@/components/shared/Sidebar'
import MobileNav from '@/components/shared/MobileNav'

function layout({ children }: { children: ReactNode }) {
  return (
    <main className='root'>
      <Sidebar />
      <MobileNav />
      <div className='root-container'>
        <div className='wrapper'>
          {children}
        </div>
      </div>
    </main>
  )
}

export default layout