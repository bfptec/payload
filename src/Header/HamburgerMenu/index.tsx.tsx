'use client'
import Link from 'next/link'
import type { Header } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { SearchIcon } from 'lucide-react'
import { Sling as Hamburger } from 'hamburger-react'
import { useState } from 'react'

export default function HamburgerMenu({ header }: { header: Header }) {
  const navItems = header?.navItems || []
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <Hamburger color="#0034a6" easing="ease-in" size={32} toggled={isOpen} toggle={setOpen} />
      {isOpen && BurgurContent({ navItems })}
    </>
  )

  function BurgurContent({ navItems }) {
    return (
      <nav
        className={
          'container absolute inset-x-0 top-full mx-auto flex h-[260px] flex-col gap-4 rounded-2xl bg-black p-8 text-xl font-semibold dark:bg-blue-50'
        }
      >
        {navItems.map(({ link }, i) => {
          return <CMSLink key={i} {...link} appearance="link" />
        })}
        <Link href="/search">
          <span className="sr-only">Search</span>
          <SearchIcon className="w-5 text-primary" />
        </Link>
      </nav>
    )
  }
}
