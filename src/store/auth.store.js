import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      token: null,
      user: null,
      login: ({ isLoggedIn, token, user }) => set({ isLoggedIn, token, user }),
      logout: () => set({ isLoggedIn: false, token: null, user: null }),
    }),
    {
      name: 'auth-store',
    }
  )
);

export const logout = useAuthStore.getState().logout;
