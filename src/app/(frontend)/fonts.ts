import localFont from 'next/font/local'

// yekanbakh woff2
export const yekanbakh = localFont({
  src: [
    // 400
    {
      path: '../../../public/fonts/yekanbakh/woff2/YekanBakh-Light.woff2',
      weight: '400',
      style: 'normal',
    },
    // 500
    {
      path: '../../../public/fonts/yekanbakh/woff2/YekanBakh-Regular.woff2',
      weight: '500',
      style: 'normal',
    },
    // 600
    {
      path: '../../../public/fonts/yekanbakh/woff2/YekanBakh-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    // 700
    {
      path: '../../../public/fonts/yekanbakh/woff2/YekanBakh-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-yekanbakh',
  preload: true,
})
