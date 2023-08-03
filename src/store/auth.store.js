import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      token: null,
      login: ({ isLoggedIn, token }) => set({ isLoggedIn, token }),
      logout: () => set({ isLoggedIn: false, token: null }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
