import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function main() {
  const posts = await prisma.post.findMany({
    select: { title: true, coverImage: true }
  });
  console.log(JSON.stringify(posts, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
