import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

const SYSTEM_SLUGS = [
  "cargowise",
  "magaya",
  "sap",
  "oracle",
  "motive",
  "descartes",
  "mercurygate",
  "flexport",
  "freightos",
  "kuebix",
  "roserocket",
  "manhattan",
  "blueyonder",
  "3pl-central",
  "shipstation",
] as const

const SYSTEM_PATTERN = SYSTEM_SLUGS.join("|")

// Matches: /{city}-{systemA}-{systemB}-{suffix}
const CITY_SYSTEM_PAGE_REGEX = new RegExp(
  `^/[a-z0-9-]+-(?:${SYSTEM_PATTERN})-(?:${SYSTEM_PATTERN})-[a-z0-9-]+/?$`,
  "i"
)

function isCitySystemIntegrationPath(pathname: string): boolean {
  // Explicit exclusions requested by user.
  if (
    pathname === "/" ||
    pathname === "/logistics" ||
    pathname === "/shipping" ||
    pathname === "/finance" ||
    pathname === "/compliance" ||
    pathname.startsWith("/blog/") ||
    pathname.startsWith("/integration/")
  ) {
    return false
  }

  return CITY_SYSTEM_PAGE_REGEX.test(pathname)
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protected routes - redirect to login if not authenticated
  const protectedRoutes = ["/upload", "/dashboard", "/checkout"]
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )

  if (isProtectedRoute && !user) {
    const redirectUrl = new URL("/login", request.url)
    redirectUrl.searchParams.set("redirect", request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Redirect authenticated users away from login page
  if (request.nextUrl.pathname === "/login" && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  if (isCitySystemIntegrationPath(pathname)) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow")
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     * - api routes
     * - sitemap files
     * - robots.txt
     */
    "/((?!_next/static|_next/image|favicon.ico|robots\\.txt|sitemap-index\\.xml|sitemaps|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api).*)",
  ],
}
