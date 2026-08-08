import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const idToken = authHeader.slice("Bearer ".length);
    const decoded = await adminAuth.verifyIdToken(idToken);

    const studentSnap = await adminDb
      .collection("students")
      .doc(decoded.uid)
      .get();

    if (!studentSnap.exists) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 403 }
      );
    }

    const profile = studentSnap.data();

    if (profile?.role !== "admin" || profile?.status !== "approved") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const body = await request.json();

    const {
      fileName,
      classId,
      subject,
      chapterTitle,
      type,
    } = body;

    if (!fileName || !classId || !subject || !chapterTitle || !type) {
      return NextResponse.json(
        { error: "Missing material information" },
        { status: 400 }
      );
    }

    if (!String(fileName).toLowerCase().endsWith(".pdf")) {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    const safeFileName = String(fileName).replace(
      /[^a-zA-Z0-9._-]/g,
      "_"
    );

    const storagePath =
      `materials/${classId}/${subject}/${chapterTitle}/` +
      `${Date.now()}-${safeFileName}`;

    const { data, error } = await supabaseAdmin.storage
      .from("study-materials")
      .createSignedUploadUrl(storagePath);

    if (error || !data) {
      console.error("Signed upload URL error:", error);

      return NextResponse.json(
        { error: "Could not create upload URL" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      path: storagePath,
      token: data.token,
    });
  } catch (error) {
    console.error("Upload preparation error:", error);

    return NextResponse.json(
      { error: "Upload preparation failed" },
      { status: 500 }
    );
  }
}
     
        

  
