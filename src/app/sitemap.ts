import { BASE_URL } from "@/lib/constants";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = BASE_URL;

  const categories = [
    "business",
    "money-markets",
    "tech-innovation",
    "ai",
    "lifestyle",
    "politics",
  ].map((slug) => ({
    url: `${baseUrl}/category/${slug}`,
    lastModified: new Date(),
  }));

  const staticPages = ["", "/about", "/contact"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...categories];
}
