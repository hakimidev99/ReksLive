import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../Constants/supabaseClient';

type Profile = {
  username: string | null;
  avatar_url: string | null;
   user_id: string | null; 
};

const ProfileContext = createContext<{
  profile: Profile | null;
  refreshProfile: () => Promise<void>;
}>({
  profile: null,
  refreshProfile: async () => {},
});

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  const fetchProfile = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        setProfile(null);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('username, avatar_url, user_id')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Fetch Profile Error:', error.message);
        setProfile(null);
        return;
      }

      if (!data) {
        // Optionally create an empty profile row if none exists
        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert([{ id: user.id, username: null, avatar_url: null }])
          .select('username, avatar_url')
          .single();

        if (insertError) {
          console.error('Insert Profile Error:', insertError.message);
          setProfile(null);
          return;
        }
        setProfile(newProfile);
        return;
      }

      let avatarUrl = data.avatar_url;

      // If we store only the file path, convert it to public URL
      if (avatarUrl && !avatarUrl.startsWith('http')) {
        const { data: publicUrlData } = supabase
          .storage
          .from('avatars')
          .getPublicUrl(avatarUrl);
        avatarUrl = publicUrlData?.publicUrl || null;
      }

      setProfile({
        username: data.username,
        avatar_url: avatarUrl,
         user_id: data.user_id
      });

    } catch (err: any) {
      console.error('Unexpected Profile Fetch Error:', err.message);
      setProfile(null);
    }
  };

  useEffect(() => {
    fetchProfile();
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        fetchProfile();
      }
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, refreshProfile: fetchProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
