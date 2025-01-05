import { throwErrorMessage } from "@/controllers/errorController";
import { getCourseSubscribedUsers } from "@/services/courseService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const subscribedUsers = await getCourseSubscribedUsers(params.courseId);
    return NextResponse.json(subscribedUsers, { status: 200 });
  } catch (error) {
    return throwErrorMessage(
      error,
      "app/api/v2/users/[userId]/subscribe-course/[courseId]/route.ts"
    );
  }
}
