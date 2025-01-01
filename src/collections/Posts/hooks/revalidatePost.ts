import { revalidatePath, revalidateTag } from 'next/cache'

import type { Post } from '../../../payload-types'
import configPromise from '@payload-config'
import { getPayload, type CollectionAfterChangeHook, type CollectionAfterDeleteHook } from 'payload'

export const revalidatePost: CollectionAfterChangeHook<Post> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/posts/${doc.slug ? encodeURIComponent(doc.slug) : doc.slug}`

      payload.logger.info(`Revalidating post at path: ${path}`)

      revalidatePath(path)
      revalidateTag('posts-sitemap')
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/posts/${previousDoc.slug ? encodeURIComponent(previousDoc.slug) : previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('posts-sitemap')
    }

    // revalidate all pages by post update too
    await revalidateAllPage()
  }

  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = async ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/posts/${doc?.slug ? encodeURIComponent(doc?.slug) : doc?.slug}`

    revalidatePath(path)
    revalidateTag('posts-sitemap')
    // revalidate all pages by post update too
    await revalidateAllPage()
  }

  return doc
}

const revalidateAllPage = async () => {
  const payload = await getPayload({ config: configPromise })

  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })

  pages.docs.forEach((page) => {
    const pagePath =
      page.slug === 'home' ? '/' : `/${page.slug ? encodeURIComponent(page.slug) : page.slug}`
    payload.logger.info(`Revalidating page at path: ${pagePath}`)
    revalidatePath(pagePath)
    revalidateTag('pages-sitemap')
  })
}
