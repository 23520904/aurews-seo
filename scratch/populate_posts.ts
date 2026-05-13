import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("Cleaning up posts...");
  await prisma.post.deleteMany();
  
  const user = await prisma.user.findFirst();
  if (!user) throw new Error("No user found");

  const categories = await prisma.category.findMany();
  
  const posts = [
    {
      title: "The Architecture of the Next Intelligent Age",
      body: "We are entering an era where AI is not just a tool but the foundation of our digital existence...",
      category: "Tech & Innovation",
      slug: "architecture-intelligent-age",
      coverImage: "https://res.cloudinary.com/docpflk0p/image/upload/v1778529196/aurews_production/rjzdhe8gbs9hkjzi6ubz.webp"
    },
    {
      title: "Global Markets Brace for Decentralized Liquidity",
      body: "As central banks pivot, decentralized finance is emerging as a credible alternative...",
      category: "Money & Markets",
      slug: "decentralized-liquidity",
      coverImage: "https://res.cloudinary.com/docpflk0p/image/upload/v1778529197/aurews_production/bvgndclgiimlbnitbkfx.jpg"
    },
    {
      title: "Sustainable Brutalism: A New Design Paradigm",
      body: "Modern architecture is returning to its roots...",
      category: "Lifestyle",
      slug: "sustainable-brutalism",
      coverImage: "https://res.cloudinary.com/docpflk0p/image/upload/v1778529198/aurews_production/jx5k1v1hgafvfnhrwz6r.avif"
    },

    {
      title: "Quantum Supremacy and the Future of Encryption",
      body: "The arrival of functional quantum computers poses a significant threat...",
      category: "A.I.",
      slug: "quantum-encryption",
      coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "The Future of Urban Mobility",
      body: "Autonomous vehicles and smart infrastructure are reshaping our cities...",
      category: "Tech & Innovation",
      slug: "urban-mobility",
      coverImage: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Digital Sovereignty in the Age of Big Tech",
      body: "How nations are reclaiming control over their data and infrastructure...",
      category: "Politics",
      slug: "digital-sovereignty",
      coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200"
    }
  ];

  for (const p of posts) {
    const cat = categories.find((c: any) => c.name === p.category);
    if (cat) {
      await prisma.post.create({
        data: {
          title: p.title,
          body: p.body,
          slug: p.slug,
          status: 'PUBLISHED',
          authorId: user.id,
          categoryId: cat.id,
          views: Math.floor(Math.random() * 5000),
          coverImage: p.coverImage
        }
      });
    }
  }

  console.log("Population complete.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
