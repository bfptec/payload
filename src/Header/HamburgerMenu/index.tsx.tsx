'use client'
import Link from 'next/link'
import type { Header } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { MenuIcon, SearchIcon, XIcon } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'

export default function HamburgerMenu({ header }: { header: Header }) {
  const navItems = header?.navItems || []
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <span className="sr-only">باز کردن منو کاربری</span>
          {open ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" onClick={() => setOpen(false)}>
        <SheetHeader className="sr-only">
          <SheetTitle>منو موبایل</SheetTitle>
          <SheetDescription>دسته بندی صفحات بنیان فراورش پارسه</SheetDescription>
        </SheetHeader>
        <div className={'flex gap-2 items-center translate-y-[-12px] justify-end'}>
          <Link href="/search">
            <span className="sr-only">جستجو</span>
            <SearchIcon className="w-5 text-foreground" />
          </Link>
          <ThemeSelector />
        </div>
        <div className="grid gap-6 p-6 ">
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
        </div>
      </SheetContent>
    </Sheet>
  )
}
