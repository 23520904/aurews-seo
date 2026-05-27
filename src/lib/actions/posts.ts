"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string || title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
  const body = formData.get("body") as string;
  const categoryId = formData.get("categoryId") as string;
  const status = (formData.get("status") as "PUBLISHED" | "DRAFT") || "DRAFT";
  const coverImage = formData.get("coverImage") as string || null;

  if (!title || !body || !categoryId) {
    return { error: "Missing required fields" };
  }

  try {
    const post = await prisma.post.create({
      data: {
        title,
        slug,
        body,
        categoryId,
        status,
        coverImage,
        authorId: session.user.id,
      },
    });

    revalidatePath("/");
    revalidatePath("/dashboard");
    revalidatePath(`/category/${categoryId}`);
    
    return { success: true, id: post.id };
  } catch (error) {
    console.error("Failed to create post:", error);
    return { error: "Failed to create post. Slug might be taken." };
  }
}

export async function updatePost(id: string, formData: FormData) {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const body = formData.get("body") as string;
  const categoryId = formData.get("categoryId") as string;
  const status = (formData.get("status") as "PUBLISHED" | "DRAFT") || "DRAFT";
  const coverImage = formData.get("coverImage") as string;

  if (!title || !body || !categoryId) {
    return { error: "Missing required fields" };
  }

  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        body,
        categoryId,
        status,
        coverImage,
      },
    });

    revalidatePath("/");
    revalidatePath("/dashboard");
    revalidatePath(`/article/${post.slug}`);
    
    return { success: true };
  } catch (error) {
    console.error("Failed to update post:", error);
    return { error: "Failed to update post." };
  }
}

export async function deletePost(id: string) {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.post.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/dashboard");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to delete post:", error);
    return { error: "Failed to delete post." };
  }
}

export async function bulkCreatePosts(postsData: { slug?: string, title: string, body: string, excerpt?: string, coverImage?: string, categoryId: string, status?: "PUBLISHED" | "DRAFT" }[]) {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }

  // Check if user is ADMIN
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true }
  });

  if (user?.role !== 'ADMIN') {
    return { error: "Forbidden: Admin access required" };
  }

  if (!Array.isArray(postsData) || postsData.length === 0) {
    return { error: "Invalid data format: Expected non-empty array" };
  }

  try {
    const results = await prisma.$transaction(
      postsData.map((post) => {
        const slug = post.slug || post.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
        return prisma.post.create({
          data: {
            title: post.title,
            slug,
            body: post.body,
            excerpt: post.excerpt,
            coverImage: post.coverImage,
            categoryId: post.categoryId,
            status: post.status || 'PUBLISHED',
            authorId: session.user!.id as string,
          },
        });
      }),
      {
        timeout: 30000, // Increase to 30 seconds for large batches
      }
    );

    revalidatePath("/");
    revalidatePath("/dashboard");
    
    return { success: true, count: results.length };
  } catch (error: unknown) {
    console.error("Bulk creation failed:", error);
    return { error: `Bulk creation failed: ${error instanceof Error ? error.message : "Possible slug duplication or invalid category ID"}` };
  }
}
