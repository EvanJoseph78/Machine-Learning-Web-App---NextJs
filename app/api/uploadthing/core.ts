import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs/server"

const f = createUploadthing();

const handleAuth = (
) => {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorizad");
  return { userId };
}

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => { }),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware((req) => handleAuth())
    .onUploadComplete(() => { }),
  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => { })

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
