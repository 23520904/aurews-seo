import { prisma } from "./src/lib/prisma";

async function check() {
  const count = await prisma.post.count();
  console.log(`Total posts: ${count}`);
  const posts = await prisma.post.findMany({
    include: { author: true, category: true }
  });
  console.log(JSON.stringify(posts, null, 2));
}

check();
