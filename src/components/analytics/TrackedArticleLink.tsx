'use client'

import Link from 'next/link'
import { sendGTMEvent } from '@next/third-parties/google'
import type { ReactNode } from 'react'

type TrackedArticleLinkProps = {
  href: string
  title: string
  slug: string
  category?: string | null
  cardLocation: string
  children: ReactNode
  className?: string
}

export default function TrackedArticleLink({
  href,
  title,
  slug,
  category,
  cardLocation,
  children,
  className,
}: TrackedArticleLinkProps) {
  const handleClick = () => {
    sendGTMEvent({
      event: 'article_card_click',
      article_title: title,
      article_slug: slug,
      article_category: category || 'unknown',
      card_location: cardLocation,
      link_url: href,
    })
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}
