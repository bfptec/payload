import React from 'react'
import MockData from '@/mock/data.json'
import Image from 'next/image'

export const Icon = () => {
  return (
    <Image
      className="w-[90px]"
      alt={MockData.title}
      src="/images/logo.png"
      width={90}
      height={60}
    />
  )
}
