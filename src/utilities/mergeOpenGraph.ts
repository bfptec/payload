import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'ما یک شرکت دانش بنیان متشکل از نخبگان، هیئت علمی دانشگاه تهران و خبرگان صنعتی هستیم که در زمینه طراحی و ساخت سیستم های تصفیه آب، تصفیه سیالات معدنی و تصفیه آب خاکستری مبتنی بر غشاهای پلیمری، سرامیکی و روش های اکسیداسیون پیشرفته (AOP) فعالیت می کنیم.',
  images: [
    {
      url: `${getServerSideURL()}/website-template-OG.webp`,
    },
  ],
  siteName: 'بنیان فراورش پارسه',
  title: 'بنیان فراورش پارسه',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
