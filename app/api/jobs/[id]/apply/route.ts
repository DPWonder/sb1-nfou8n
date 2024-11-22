import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { db } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await request.formData();
    const coverLetter = formData.get("coverLetter") as string;
    const resume = formData.get("resume") as File;

    // Store resume file (implement your file storage logic here)
    let resumeUrl = null;
    if (resume) {
      // Upload to your storage service (e.g., S3, Cloudinary)
      // resumeUrl = await uploadFile(resume);
    }

    const application = await db.jobApplication.create({
      data: {
        jobId: params.id,
        userId: session.user.id,
        coverLetter,
        resume: resumeUrl,
      },
    });

    return NextResponse.json(application);
  } catch (error) {
    console.error("Application error:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}