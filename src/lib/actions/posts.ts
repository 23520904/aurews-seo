"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string || title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
  const body = formData.get("body") as string;
  const categoryId = formData.get("categoryId") as string;
  const status = (formData.get("status") as any) || "DRAFT";
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
  const status = (formData.get("status") as any) || "DRAFT";
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

