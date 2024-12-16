// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { fa } from '@payloadcms/translations/languages/fa'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      graphics: {
        Icon: '/components/graphics/Icon/index.tsx#Icon',
        Logo: '/components/graphics/Logo/index.tsx#Logo',
      },
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    meta: {
      description: 'بنیان فراورش پارسه | خدمات تصفیه آب و فاضلاب',
      icons: [
        {
          type: 'image/png',
          rel: 'icon',
          url: '/favicon.svg',
        },
      ],
      openGraph: {
        description:
          'شرکت بنیان فراورش پارسه ارایه دهنده خدمات تصفیه آب و فاضلاب | غشاهای سرامیکی، ممبران سرامیکی، تصفیه آب، تصفیه سیالات، بازیافت غشاهای مستعمل اسمز معکوس، تبدیل غشاهای مستعمل اسمز معکوس به نانوفیلتراسیون و اولترافیلتراسیون، اولترافیلتراسیون، نانو فیلتراسیون، صنایع فولاد، صنایع مس، صنایع معدنی، PLS، هیپ لیچینگ، هیدرومتالورژی',
        images: [
          {
            height: 600,
            url: '/website-template-OG.webp',
            width: 800,
          },
        ],
        title: 'بنیان فراورش پارسه',
      },
      titleSuffix: 'بنیان فراورش پارسه',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  collections: [Pages, Posts, Media, Categories, Users],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  i18n: {
    supportedLanguages: { fa },
  },
  localization: {
    locales: ['fa'],
    defaultLocale: 'fa',
    fallback: true,
  },
  // email: nodemailerAdapter({
  //   defaultFromAddress: 'info@bfptec.ir',
  //   defaultFromName: 'bfptec',
  //   // Nodemailer transportOptions
  //   transportOptions: {
  //     host: process.env.SMTP_HOST,
  //     port: 587,
  //     auth: {
  //       user: process.env.SMTP_USER,
  //       pass: process.env.SMTP_PASS,
  //     },
  //   },
  // }),
})
