import { ok, withErrorHandler } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";

export const GET = withErrorHandler(async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get('cursor');        // optional
  const limit = Math.min(Number(searchParams.get('limit')) || 10, 50);
  const categorySlug = searchParams.get('category');

  const where: any = { status: 'PUBLISHED' };
  if (categorySlug) {
    where.category = { slug: categorySlug };
  }

  const posts = await prisma.post.findMany({
    take: limit + 1,              // overfetch by 1 to detect hasMore
    skip: cursor ? 1 : 0,       // skip cursor item itself
    cursor: cursor ? { id: cursor } : undefined,
    where,
    orderBy: { createdAt: 'desc' },
    include: { author: true, category: true },
  });

  const hasMore = posts.length > limit;
  const items = hasMore ? posts.slice(0, limit) : posts;
  const nextCursor = hasMore ? items[items.length - 1].id : null;

  return ok({
    posts: items,
    nextCursor,             // null = no more pages
    count: items.length,
  });
});
