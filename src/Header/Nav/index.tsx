'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []

  return (
    <nav className="flex-1 flex gap-3 items-center justify-between">
      <div className="flex items-center gap-3">
        {navItems.map(({ link }, i) => {
          return <CMSLink className="text-foreground" key={i} {...link} appearance="link" />
        })}
      </div>
      <div className="flex gap-4 items-center">
        <Link href="/search">
          <span className="sr-only">جستجو</span>
          <SearchIcon className="w-5 text-foreground" />
        </Link>
        <ThemeSelector />
      </div>
    </nav>
  )
}
