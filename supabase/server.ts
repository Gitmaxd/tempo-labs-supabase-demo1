import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = async () => {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll().map(({ name, value }) => ({
            name,
            value,
          }));
        },
        setAll(cookiesToSet) {
          // In Next.js App Router, cookies can only be set in a Server Action or Route Handler
          // We need to check if we're in a mutable context before setting cookies
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // If we're not in a mutable context (e.g., in a Server Component),
            // we'll catch the error but not throw it, as the session will still work
            // for the current request
            console.warn("Warning: Unable to set cookies in this context. This is expected in some cases.");
          }
        },
      },
    }
  );
};
