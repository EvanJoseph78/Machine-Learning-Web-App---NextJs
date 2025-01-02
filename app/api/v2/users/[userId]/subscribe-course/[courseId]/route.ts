import { subscribeCourseController } from "@/controllers/userController";
import { NextResponse } from "next/server";

export async function POST({
  params,
}: {
  params: { clerkId: string; courseId: string };
}) {
  try {
    return await subscribeCourseController(params.clerkId, params.courseId);
  } catch (error) {}
}
