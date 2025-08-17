import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

export default function StreamerProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', user.id)
          .single();
        if (!error) setProfile(data);
      }
      setLoading(false);
    };

    fetchProfile();

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) setProfile(null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { profile, loading };
}
