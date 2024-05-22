"use server"

import { revalidatePath } from "next/cache"

export async function revalidate({ path, type }: { path: string, type: "layout" | "page" | undefined }) {
  revalidatePath(path, type)
}
