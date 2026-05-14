'use client'

import { useState, useTransition } from 'react'
import { PostCard } from './PostCard'

type Props = {
  initialCursor: string | null
  endpoint:      string
  pageSize:      number
}

export function LoadMore({ initialCursor, endpoint, pageSize }: Props) {
  const [posts,  setPosts ] = useState<any[]>([])
  const [cursor, setCursor] = useState(initialCursor)
  const [isPending, startTransition] = useTransition()

  async function fetchMore() {
    startTransition(async () => {
      try {
        const res  = await fetch(
          `${endpoint}?cursor=${cursor}&limit=${pageSize}`
        )
        if (!res.ok) throw new Error('fetch failed')

        const json = await res.json()
        const { data } = json
        setPosts(prev => [...prev, ...data.posts])
        setCursor(data.nextCursor)    // null when exhausted
      } catch (err) {
        console.error(err)
      }
    })
  }

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '48px' }}>
        {posts.map(post => <PostCard key={post.id} post={post} />)}
      </div>

      {cursor ? (
        <button
          onClick={fetchMore}
          disabled={isPending}
          className={`btn-load-more ${isPending ? 'loading' : ''}`}
          style={{
            display: 'block',
            width: '100%',
            margin: '64px 0 0',
            background: 'var(--paper-white)',
            border: '4px solid var(--wired-black)',
            color: 'var(--wired-black)',
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            padding: '24px 0',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            position: 'relative'
          }}
        >
          {isPending ? '' : 'Load More Stories'}
        </button>
      ) : (
        <div style={{ padding: '64px 0', textAlign: 'center', borderTop: '2px solid var(--hairline-tint)', marginTop: '64px' }}>
            <p className="wired-mono" style={{ color: 'var(--disabled-gray)', fontSize: '14px' }}>
                [✓] ALL STORIES LOADED
            </p>
        </div>
      )}
    </>
  )
}
