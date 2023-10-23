import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface useUserStoreType {
  user: any;
  token: string;
  storeUser: (data: {}) => void;
  storeToken: (token: string) => void;
}

export const useUserStore = create<useUserStoreType>()(
  persist(
    (set) => ({
      user: {},
      token: "",
      storeUser: (data) => set({ user: data }),
      storeToken: (token) => set({ token: token }),
    }),
    {
      name: "user",
    }
  )
);
