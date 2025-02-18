'use client'
import React, { useState } from 'react'
import type { Theme } from './types'
import { useTheme } from '..'
import { themeLocalStorageKey } from './types'
import { Moon, Sun, UserRoundCog } from 'lucide-react'
import { cn } from '@/utilities/cn'

type TProps = { className?: string }
export const ThemeSelector: React.FC<TProps> = ({ className }: TProps) => {
  const { setTheme } = useTheme()
  const [value, setValue] = useState('')

  const onThemeChange = (themeToSet: Theme) => {
    setTheme(themeToSet)
    setValue(themeToSet)
  }

  React.useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    setValue(preference ?? 'auto')
  }, [])

  return (
    <div className={cn('flex rounded-full transition-all duration-100 ', className)}>
      {value == 'light' ? (
        <Sun
          onClick={() => onThemeChange('dark')}
          className={`size-8 cursor-pointer rounded-full border-border p-1 border`}
        />
      ) : (
        <Moon
          onClick={() => onThemeChange('light')}
          className={`size-8 cursor-pointer rounded-full border-border p-1 border text-blue-500`}
        />
      )}
    </div>
  )
}
