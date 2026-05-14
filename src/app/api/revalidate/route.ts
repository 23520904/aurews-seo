import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-revalidate-secret');
  
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { slug, categorySlug } = await req.json();

  if (slug) revalidatePath(`/article/${slug}`);
  if (categorySlug) revalidatePath(`/category/${categorySlug}`);
  
  revalidatePath('/');
  revalidatePath('/latest');
  revalidatePath('/sitemap.xml');

  return NextResponse.json({ revalidated: true, ts: new Date().toISOString() });
}
