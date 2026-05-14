import TrackedArticleLink from '@/components/analytics/TrackedArticleLink';
import { DEFAULT_IMAGE } from "@/lib/constants";

interface PostCardProps {
  post: any;
  cardLocation?: string;
}

export function PostCard({ post, cardLocation = 'unknown' }: PostCardProps) {
  return (
    <article style={{ borderBottom: '1px solid var(--hairline-tint)', paddingBottom: '32px' }}>
      <TrackedArticleLink 
        href={`/article/${post.slug}`}
        title={post.title}
        slug={post.slug}
        category={post.category?.name}
        cardLocation={cardLocation}
      >
        <div style={{ aspectRatio: '16/9', border: '1px solid var(--wired-black)', overflow: 'hidden', marginBottom: '16px', background: '#f8f8f8' }}>
          <img
            src={post.coverImage || DEFAULT_IMAGE}
            alt={post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </TrackedArticleLink>

      <div className="wired-mono" style={{ fontSize: '10px', color: 'var(--blue)', marginBottom: '8px' }}>
        {post.category?.name?.toUpperCase() || "UNCATEGORIZED"}
      </div>
      
      <TrackedArticleLink 
        href={`/article/${post.slug}`}
        title={post.title}
        slug={post.slug}
        category={post.category?.name}
        cardLocation={cardLocation}
      >
        <h3 className="wired-display" style={{ fontSize: '28px', marginBottom: '12px' }}>
          {post.title}
        </h3>
      </TrackedArticleLink>

      <p className="wired-body" style={{ fontSize: '15px', color: 'var(--caption-gray)', marginBottom: '16px' }}>
        {post.excerpt || (post.body && post.body.substring(0, 150) + "...")}
      </p>
      <div className="wired-mono" style={{ fontSize: '11px', color: 'var(--caption-gray)' }}>
        {new Date(post.createdAt).toLocaleDateString()} / BY {post.author?.name?.toUpperCase() || "STAFF"}
      </div>
    </article>
  );
}
