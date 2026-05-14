import Link from "next/link";

interface PostCardProps {
  post: any;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article style={{ borderBottom: '1px solid var(--hairline-tint)', paddingBottom: '32px' }}>
      {post.coverImage && (
        <div style={{ aspectRatio: '16/9', border: '1px solid var(--wired-black)', overflow: 'hidden', marginBottom: '16px' }}>
          <img
            src={post.coverImage}
            alt={post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}
      <div className="wired-mono" style={{ fontSize: '10px', color: 'var(--blue)', marginBottom: '8px' }}>
        {post.category?.name?.toUpperCase() || "UNCATEGORIZED"}
      </div>
      <Link href={`/article/${post.slug}`}>
        <h3 className="wired-display" style={{ fontSize: '28px', marginBottom: '12px' }}>
          {post.title}
        </h3>
      </Link>

      <p className="wired-body" style={{ fontSize: '15px', color: 'var(--caption-gray)', marginBottom: '16px' }}>
        {post.excerpt || (post.body && post.body.substring(0, 150) + "...")}
      </p>
      <div className="wired-mono" style={{ fontSize: '11px', color: 'var(--caption-gray)' }}>
        {new Date(post.createdAt).toLocaleDateString()} / BY {post.author?.name?.toUpperCase() || "STAFF"}
      </div>
    </article>
  );
}
