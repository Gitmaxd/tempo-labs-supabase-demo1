import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  // This `try/catch` block is only here for the interactive tutorial.
  // Feel free to remove once you have Supabase connected.
  try {
    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll().map(({ name, value }) => ({
              name,
              value,
            }));
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              try {
                request.cookies.set(name, value);
              } catch (e) {
                console.warn('Warning: Unable to set cookie on request', e);
              }
              
              // Create a new response each time to ensure cookies are properly set
              response = NextResponse.next({
                request: {
                  headers: request.headers,
                },
              });
              
              try {
                response.cookies.set(name, value, options);
              } catch (e) {
                console.warn('Warning: Unable to set cookie on response', e);
              }
            });
          },
        },
      }
    );

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      // protected routes
      if (request.nextUrl.pathname.startsWith("/dashboard") && error) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }

      if (request.nextUrl.pathname === "/" && !error) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (e) {
      console.error('Error checking user in middleware:', e);
    }

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    console.error('Error creating Supabase client in middleware:', e);
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
