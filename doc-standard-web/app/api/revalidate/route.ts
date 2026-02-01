import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret")

  // Verify secret token
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { path } = body

    if (!path) {
      return NextResponse.json(
        { message: "Path is required" },
        { status: 400 }
      )
    }

    revalidatePath(path)

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      path,
    })
  } catch (error: unknown) {
    return NextResponse.json(
      { message: `Error revalidating: ${error}` },
      { status: 500 }
    )
  }
}
