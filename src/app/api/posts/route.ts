import { ok, withErrorHandler } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";

export const GET = withErrorHandler(async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const limit = Math.min(Number(searchParams.get('limit')) || 25, 100);
  const status = searchParams.get('status');
  const authorId = searchParams.get('authorId');
  const categoryId = searchParams.get('categoryId');
  const query = searchParams.get('q');

  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {
    ...(status ? { status } : {}),
    ...(authorId ? { authorId } : {}),
    ...(categoryId ? { categoryId } : {}),
    ...(query ? {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { excerpt: { contains: query, mode: 'insensitive' } },
      ]
    } : {})
  };

  // If not admin, only show own posts unless specifically requested for public view (but this route is mostly for management)
  // For simplicity, we'll follow the doc's implication of admin/dashboard usage.
  
  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { author: true, category: true },
    }),
    prisma.post.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return ok({
    posts,
    total,
    page,
    totalPages,
    limit,
    offset: skip,
  });
});
