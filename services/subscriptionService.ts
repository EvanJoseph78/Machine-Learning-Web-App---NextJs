import { db } from "@/lib/db";

export const checkExistentSubscription = async (
  courseId: string,
  userId: string
): Promise<boolean> => {
  const subscription = await db.subscription.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
  });

  return subscription !== null;
};
