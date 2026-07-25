import { createClient } from '@supabase/supabase-js';

// Supabase Project Credentials (Loaded safely via Vite import.meta.env)
const SUPABASE_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_URL) 
  ? import.meta.env.VITE_SUPABASE_URL 
  : 'https://xyzcompany.supabase.co';

const SUPABASE_ANON_KEY = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_ANON_KEY) 
  ? import.meta.env.VITE_SUPABASE_ANON_KEY 
  : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_key';

// Initialize Supabase Client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const supabaseService = {
  // Sign Up Contractor Account
  signUp: async ({ email, password, companyName, csdMaaa, bbbeeLevel, plan = 'pro' }) => {
    try {
      if (SUPABASE_URL !== 'https://xyzcompany.supabase.co') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              company_name: companyName,
              csd_maaa: csdMaaa,
              bbbee_level: bbbeeLevel,
              plan_id: plan
            }
          }
        });
        if (error) throw error;
        return { success: true, user: data.user };
      }
    } catch (err) {
      console.warn('Real Supabase credentials note:', err.message);
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      email,
      companyName: companyName || 'Contracting Enterprise SA',
      csdMaaa: csdMaaa || 'MAAA0912384',
      bbbeeLevel: bbbeeLevel || 'B-BBEE Level 1',
      plan: plan || 'pro',
      createdAt: new Date().toISOString()
    };

    localStorage.setItem('gt_current_user', JSON.stringify(newUser));
    return { success: true, user: newUser };
  },

  // Sign In Existing User
  signIn: async (email, password) => {
    try {
      if (SUPABASE_URL !== 'https://xyzcompany.supabase.co') {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return { success: true, user: data.user };
      }
    } catch (err) {
      console.warn('Real Supabase credentials note:', err.message);
    }

    const savedUser = localStorage.getItem('gt_current_user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      return { success: true, user: parsed };
    }

    const demoUser = {
      id: 'usr_demo_8912',
      email,
      companyName: 'Apex Infrastructure Solutions (Pty) Ltd',
      csdMaaa: 'MAAA0987123',
      bbbeeLevel: 'B-BBEE Level 1 Contributor',
      plan: 'enterprise',
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('gt_current_user', JSON.stringify(demoUser));
    return { success: true, user: demoUser };
  },

  // Sign Out
  signOut: async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      // Ignore fallback
    }
    localStorage.removeItem('gt_current_user');
    return { success: true };
  },

  // Get Current Session User
  getCurrentUser: () => {
    try {
      const saved = localStorage.getItem('gt_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  }
};
