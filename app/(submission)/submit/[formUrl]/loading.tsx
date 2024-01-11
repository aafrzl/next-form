import { Loader } from 'lucide-react'
import React from 'react'

export default function Loading() {
  return (
    <div className='flex min-h-screen w-full items-center justify-center'>
      <Loader className='animate-spin' />
    </div>
  )
}
