import { Metadata } from "next";
import Link from "next/link";
import { Ribbon } from "@/components/ui/Ribbon";
import { prisma } from "@/lib/prisma";
import { PostCard } from "@/components/PostCard";
import { LoadMore } from "@/components/LoadMore";
import { BASE_URL } from "@/lib/constants";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const SITE_URL = BASE_URL;

const CATEGORY_SEO: Record<
  string,
  {
    title: string;
    description: string;
  }
> = {
  business: {
    title: "Business News, Trends & Analysis | Aurews",
    description:
      "Explore the latest business news, corporate trends, market shifts, and analysis from Aurews.",
  },

  "tech-innovation": {
    title: "Technology & Innovation News | Aurews",
    description:
      "Discover the latest technology news, digital innovation, emerging tools, and future-focused analysis from Aurews.",
  },

  ai: {
    title: "AI News, Tools & Artificial Intelligence Trends | Aurews",
    description:
      "Read the latest AI news, artificial intelligence trends, emerging tools, and analysis from Aurews.",
  },

  "a.i.": {
    title: "AI News, Tools & Artificial Intelligence Trends | Aurews",
    description:
      "Read the latest AI news, artificial intelligence trends, emerging tools, and analysis from Aurews.",
  },

  politics: {
    title: "Politics News, Policy & Global Affairs | Aurews",
    description:
      "Follow the latest political news, public policy developments, and global affairs analysis from Aurews.",
  },

  lifestyle: {
    title: "Lifestyle Trends, Culture & Modern Living | Aurews",
    description:
      "Explore lifestyle trends, culture, sustainable living, and modern life stories curated by Aurews.",
  },

  "money-markets": {
    title: "Markets, Finance & Economic Trends | Aurews",
    description:
      "Stay updated on financial markets, economic shifts, investment trends, and business analysis from Aurews.",
  },
};

function formatCategoryName(slug: string): string {
  if (slug === "ai" || slug === "a.i.") return "AI";

  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const categoryName = formatCategoryName(slug);
  const seo = CATEGORY_SEO[slug] ?? {
    title: `${categoryName} News & Analysis | Aurews`,
    description: `Explore the latest ${categoryName.toLowerCase()} news, stories, trends, and analysis from Aurews.`,
  };

  const canonicalUrl = `${SITE_URL}/category/${slug}`;

  return {
    title: seo.title,
    description: seo.description,

    alternates: {
      canonical: canonicalUrl,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonicalUrl,
      siteName: "Aurews",
      locale: "en_US",
      type: "website",
    },

    twitter: {
      card: "summary",
      title: seo.title,
      description: seo.description,
    },
  };
}

const PAGE_SIZE = 12;

export default async function CategoryPage({
  params
}: PageProps) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      posts: {
        where: { status: 'PUBLISHED' },
        orderBy: { createdAt: 'desc' },
        include: { author: true, category: true },
        take: PAGE_SIZE + 1
      }
    }
  });

  if (!category) {
    return (
      <div className="wired-wrapper" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h1 className="wired-display">Channel Not Found</h1>
        <Link href="/" className="wired-mono" style={{ textDecoration: 'underline' }}>Return to Home</Link>
      </div>
    );
  }

  const posts = (category as any).posts || [];
  const hasMore = posts.length > PAGE_SIZE;
  const items = hasMore ? posts.slice(0, PAGE_SIZE) : posts;
  const nextCursor = hasMore ? (items[items.length - 1] as any).id : null;

  return (
    <div className="wired-wrapper">
      <header style={{ marginBottom: '48px', borderBottom: '2px solid var(--wired-black)', paddingBottom: '24px' }}>
        <Ribbon>Channel</Ribbon>
        <h1 className="wired-display" style={{ fontSize: '72px', marginTop: '16px' }}>{category.name}</h1>
        <div className="wired-mono" style={{ fontSize: '11px', color: 'var(--caption-gray)', marginTop: '8px' }}>
          SEGMENT: {category.slug.toUpperCase()} // ARCHIVE_MODE
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '48px' }}>
        {items.map((post: any) => (
          <PostCard key={post.id} post={post} cardLocation="category_page_list" />
        ))}
      </div>

      <LoadMore
        initialCursor={nextCursor}
        endpoint={`/api/posts/latest?category=${slug}`}
        pageSize={8}
        cardLocation="category_page_load_more"
      />

      {items.length === 0 && (
        <div style={{ padding: '64px 0', textAlign: 'center' }}>
          <p className="wired-body" style={{ color: 'var(--disabled-gray)', fontSize: '20px' }}>No stories available in this channel yet.</p>
        </div>
      )}
    </div>
  );
}
