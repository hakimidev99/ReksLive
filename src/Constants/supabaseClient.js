// supabaseClient.js
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const supabase = createClient('https://qekvrqmgjxjolfioazya.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFla3ZycW1nanhqb2xmaW9henlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwNzU5MzksImV4cCI6MjA2NjY1MTkzOX0.nGmk5mju-QNrZRJvAEvFWCHQn8P6n-Nfpvqm1FNkXxQ', {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
