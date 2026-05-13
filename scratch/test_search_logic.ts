import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function testSearchLogic() {
  const query = "No"; // Testing with 'No'
  try {
    console.log("Searching for:", query);
    const results = await prisma.post.findMany({
      where: {
        status: 'PUBLISHED',
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { body: { contains: query, mode: 'insensitive' } }
        ]
      },
      include: { category: true },
      take: 20
    });
    console.log("Results found:", results.length);
    results.forEach((p: any) => console.log("- ", p.title));
  } catch (err) {
    console.error("Search logic failed:", err);
  } finally {
    await prisma.$disconnect();
  }
}

testSearchLogic();
