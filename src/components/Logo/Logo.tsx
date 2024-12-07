import React from 'react'
import MockData from '@/mock/data.json'
import Image from 'next/image'

export const Logo = ({ isWide }: { isWide: boolean }) => {
  return (
    <Image
      className="transition-all duration-500 max-lg:w-[90px]"
      alt={MockData.title}
      src="/images/logo.png"
      width={isWide ? 150 : 90}
      height={isWide ? 100 : 60}
      loading="lazy"
    />
  )
}
