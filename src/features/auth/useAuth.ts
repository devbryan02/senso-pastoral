
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();


// Custom hook for authentication
export function useAuth() {
  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return { login, logout };
}


