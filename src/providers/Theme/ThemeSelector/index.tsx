'use client'
import React, { useState } from 'react'
import type { Theme } from './types'
import { useTheme } from '..'
import { themeLocalStorageKey } from './types'
import { Moon, Sun, UserRoundCog } from 'lucide-react'

export const ThemeSelector: React.FC = () => {
  const { setTheme } = useTheme()
  const [value, setValue] = useState('')

  const onThemeChange = (themeToSet: Theme | 'auto') => {
    if (themeToSet === 'auto') {
      setTheme(null)
      setValue('auto')
    } else {
      setTheme(themeToSet)
      setValue(themeToSet)
    }
  }

  React.useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    setValue(preference ?? 'auto')
  }, [])

  return (
    <div className="flex rounded-full border border-border text-gray-400 transition-all duration-100">
      <UserRoundCog
        onClick={() => onThemeChange('auto')}
        className={`size-10 cursor-pointer rounded-full border-border p-2 hover:text-white ${value === 'auto' && 'border text-white'}`}
      />
      <Sun
        onClick={() => onThemeChange('light')}
        className={`size-10 cursor-pointer rounded-full border-border p-2 hover:text-yellow-300 ${value === 'light' && 'border text-yellow-300'}`}
      />
      <Moon
        onClick={() => onThemeChange('dark')}
        className={`size-10 cursor-pointer rounded-full border-border p-2 hover:text-blue-400 ${value === 'dark' && 'border text-blue-400'}`}
      />
    </div>
  )
}
