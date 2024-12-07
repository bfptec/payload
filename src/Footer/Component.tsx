import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import type { Footer } from '@/payload-types'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'

import data from '@/mock/data.json'
import Image from 'next/image'
import eita from '/public/images/eita.png'
import enamad from '/public/images/enamad.png'
import samandehi from '/public/images/samandehi.png'
import senfi from '/public/images/senfi.png'
import bale from '/public/svgs/bale.svg'
import location from '/public/svgs/location.svg'
import mail from '/public/svgs/mail.svg'
import phone from '/public/svgs/phone.svg'
import whatsapp from '/public/svgs/whatsapp.svg'
import LocationDisplay from './LocationDisplay'

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer')()

  const navItems = footer?.navItems || []

  return (
    <footer className="rtl border-t border-border bg-black py-4 text-start text-white dark:bg-card">
      <div className="container mx-auto w-full px-4 xl:px-0">
        <div className="flex flex-col justify-between sm:px-[18px] md:grid md:grid-cols-7">
          <div className="mx-2 md:col-span-2">
            {/* about */}
            <h1 className="text-[18px] font-bold">درباره {data.title} </h1>
            <p className="mt-[18px] text-[15px] text-white">{data.about}</p>
            {/* nemad ha */}
            <ul className="mt-8 flex gap-3">
              <li className="flex h-[101px] w-[99px] items-center justify-center rounded-lg border border-gray-200 bg-white">
                <Image src={enamad} alt="اینماد" className="m-auto blur-sm" loading="lazy" />
              </li>
              <li className="flex h-[101px] w-[99px] items-center justify-center rounded-lg border border-gray-200 bg-white">
                <Image alt="ساماندهی" src={samandehi} className="m-auto blur-sm" loading="lazy" />
              </li>
              <li className="flex h-[101px] w-[99px] items-center justify-center rounded-lg border border-gray-200 bg-white">
                <Image alt="صنفی" src={senfi} className="m-auto blur-sm" loading="lazy" />
              </li>
            </ul>
          </div>

          <address className="mx-2 text-white md:col-span-2">
            {/* phone numbers */}
            <div className="mt-[23px] flex">
              <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[75%]">
                <Image alt="تلفن پشتیبانی" width={24} height={24} src={phone} loading="lazy" />
              </div>
              <div>
                <Link
                  type="phone"
                  href={`tel:${data.aryanPhone}`}
                  title="همراه مهندس آریان "
                  className="block text-[14px]"
                  target="_blank"
                >
                  <bdi>{data.aryanPhone}</bdi>
                </Link>
                <Link
                  type="phone"
                  href={`tel:${data.salehiPhone}`}
                  title="همراه دکتر صاحی"
                  className="text-[14px]"
                  target="_blank"
                >
                  <bdi>{data.salehiPhone}</bdi>
                </Link>
              </div>
            </div>
            {/* email */}
            <div className="mt-[23px] flex">
              <Image
                alt="ایمیل پشتیبانی"
                width={24}
                height={24}
                src={mail}
                className="mx-2"
                loading="lazy"
              />
              <div>
                <Link
                  type="mailto"
                  title="ایمیل پشتیبانی"
                  target="_blank"
                  href={`mailto:${data.companyMail}`}
                  className="block text-[14px]"
                >
                  {data.companyMail}
                </Link>
                <Link
                  type="mailto"
                  title="ایمیل مهندس آریان"
                  target="_blank"
                  href={`mailto:${data.aryanMail}`}
                  className="text-[14px]"
                >
                  {data.aryanMail}
                </Link>
              </div>
            </div>

            {/* location */}
            <div className="mt-[23px] flex">
              <Image
                alt="آدرس شرکت بنیان فراورش پارسه"
                width={24}
                height={24}
                src={location}
                className="mx-2"
                loading="lazy"
              />
              <div className="ml-[18px]">
                <Link href="mailto:Info@bfptec.ir" className="text-[14px]">
                  بندرعباس، بولوار شهید ناصر، کوچه شهید ناصر، ساختمان شهید ناصر، طبقه 3، واحد 4
                </Link>
              </div>
            </div>
          </address>

          <nav className="mx-2 mt-6 md:col-span-1 md:mt-0">
            {navItems.map(({ link }, i) => {
              return <CMSLink key={i} className="mt-4 block text-white" {...link} />
            })}
          </nav>

          <div className="mx-2 mt-6 md:col-span-2 md:mt-0">
            <LocationDisplay latitude={27.18927879} longitude={56.2882664} />
          </div>
        </div>

        <hr className="mt-[30px]" />

        {/* social media */}
        <div className="flex items-center justify-center gap-3 pb-8 pt-[9px] md:py-8">
          {/* whasapp */}
          <Link
            href={`https://wa.me/${data.aryanPhone}?text=${encodeURIComponent(
              'از طریق سایت بنیان فراورش پارسه به شما متصل می شوم.',
            )}`}
            target="_blank"
            rel=" noreferrer"
          >
            <Image alt="شبکه اجتماعی واتساپ" width={24} height={24} src={whatsapp} loading="lazy" />
          </Link>

          {/* bale */}
          <Link href={`https://ble.ir/${data.baleAccount}`} target="_blank" rel=" noreferrer">
            <Image alt="شبکه اجتماعی بله" width={24} height={24} src={bale} loading="lazy" />
          </Link>
          {/* eita */}
          <Link href={`https://eitaa.ir/${data.eitaAccount}}`} target="_blank" rel="noreferrer">
            <Image alt="شبکه اجتماعی ایتا" width={24} height={24} src={eita} loading="lazy" />
          </Link>
          <ThemeSelector />
        </div>
        <p className="text-center text-[10px] md:text-[12px]">
          استفاده از مطالب این وب سایت فقط برای مقاصد غیر تجاری و با ذکر منبع بلامانع است. کلیه حقوق
          این سایت متعلق به {data.title} می باشد.
        </p>
      </div>
    </footer>
  )
}
