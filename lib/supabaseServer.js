import { createClient } from "@supabase/supabase-js";

// SERVER SIDE — usado só em rotas /api
export const supabaseServer = createClient(
  process.env.SUPABASE_URL,            // sem NEXT_PUBLIC
  process.env.SUPABASE_SERVICE_ROLE,   // a key secreta REAL
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
