import "dotenv/config";
import { Pool } from "pg";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const pool = new Pool({ connectionString: process.env.DIRECT_URL });

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });


const categories = [
  { name: "Business", slug: "business" },
  { name: "Money & Markets", slug: "money-markets" },
  { name: "Tech & Innovation", slug: "tech-innovation" },
  { name: "A.I.", slug: "ai" },
  { name: "Lifestyle", slug: "lifestyle" },
  { name: "Politics", slug: "politics" },
];

async function main() {
  console.log("Seeding categories...");
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        name: cat.name,
        slug: cat.slug,
      },
    });
  }
  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
