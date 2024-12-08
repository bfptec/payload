'use client'
import {
  Breadcrumb as SBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React from 'react'
import { ChevronLeft } from 'lucide-react'

const Breadcrumb = () => {
  const paths = usePathname()
  const pathNames = paths.split('/').filter((path) => path)

  return (
    <SBreadcrumb className="!container mt-32 z-80">
      <BreadcrumbList>
        {/* Home Link */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">صفحه اصلی</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* Separator after Home */}
        {pathNames.length > 0 && (
          <BreadcrumbSeparator>
            <ChevronLeft />
          </BreadcrumbSeparator>
        )}

        {/* Dynamically Generated Links */}
        {pathNames.map((link, index) => {
          const href = `/${pathNames.slice(0, index + 1).join('/')}`
          const isLast = index === pathNames.length - 1

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {/* Last item is just text, not a link */}
                {isLast ? (
                  <BreadcrumbPage>{decodeURIComponent(link)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{decodeURIComponent(link)}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </SBreadcrumb>
  )
}

export default Breadcrumb
