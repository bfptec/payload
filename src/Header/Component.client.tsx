'use client'
// import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
// import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import type { Header } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import HamburgerMenu from './HamburgerMenu/index.tsx'
import useBetterMediaQuery from '@/utilities/useBetterMediaQuery'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'

interface HeaderClientProps {
  header: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
  /* Storing the value in a useState to avoid hydration errors */
  // const [theme, setTheme] = useState<string | null>(null)
  // const { headerTheme, setHeaderTheme } = useHeaderTheme()
  // const pathname = usePathname()

  // useEffect(() => {
  //   setHeaderTheme(null)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pathname])

  // useEffect(() => {
  //   if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [headerTheme])

  // scroll effect
  const [isWide, setIsWide] = useState(true)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsWide(false)
      } else {
        setIsWide(true)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const isDesktop = useBetterMediaQuery('(min-width: 1024px)')

  return (
    <header
      className={`fixed bg-card/90 inset-x-0 top-0 z-20 w-full backdrop-blur-sm transition-all duration-300 max-lg:px-1 max-lg:pt-1 lg:px-2 ${isWide ? 'lg:h-28' : 'lg:h-[60px]'} opacity-0 [--slidein-delay:500ms] animate-slidein`}
      // {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="relative container flex items-center justify-between gap-12">
        <Link href="/">
          <Logo isWide={isWide} />
        </Link>
        {isDesktop ? <HeaderNav header={header} /> : <HamburgerMenu header={header} />}
      </div>
    </header>
  )
}
