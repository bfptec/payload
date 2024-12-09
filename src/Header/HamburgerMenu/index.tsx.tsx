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
      <Hamburger color="#fdfdfd" easing="ease-in" size={32} toggled={isOpen} toggle={setOpen} />
      {isOpen && BurgurContent({ navItems })}
    </>
  )

  function BurgurContent({ navItems }) {
    return (
      <nav
        className={
          'container absolute inset-x-0 top-[calc(100%+4px)] mx-auto flex h-[260px] flex-col gap-4 rounded-2xl p-8 bg-primary/90 backdrop-blur-sm '
        }
        onClick={() => setOpen(false)}
      >
        <Link href="/search">
          <span className="sr-only">جستجو</span>
          <SearchIcon className="w-5 text-foreground" />
        </Link>
        {navItems.map(({ link }, i) => {
          return (
            <CMSLink
              className="font-semibold text-foreground"
              key={i}
              {...link}
              appearance="link"
            />
          )
        })}
      </nav>
    )
  }
}
