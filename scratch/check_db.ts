import { prisma } from "../src/lib/prisma";


async function check() {
  try {
    const count = await prisma.post.count();
    console.log("Post count:", count);
  } catch (err) {
    console.error("DB check failed:", err);
  } finally {
    await prisma.$disconnect();
  }
}

check();
