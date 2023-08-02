import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
