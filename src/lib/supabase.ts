
import { createClient } from '@supabase/supabase-js';

// Use the project's Supabase URL and anonymous key directly
// These values are public and safe to include in client-side code
const supabaseUrl = 'https://skwomsadjuxughbogcuo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrd29tc2FkanV4dWdoYm9nY3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2ODQ3MTAsImV4cCI6MjA2MjI2MDcxMH0.nPPwpliwt_vFxrylLUkCguvcFuuZD6l4mdSDJ39QEko';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});
