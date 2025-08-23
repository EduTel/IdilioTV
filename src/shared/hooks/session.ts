import { supabase } from '../../feature/auth/lib/supabase';
import { useEffect, useState } from 'react';

export const useSession = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) console.error(error);
      setSession(data.session);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      },
    );

    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);
  return { session, loading };
};
