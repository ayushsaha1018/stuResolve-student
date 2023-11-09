import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface useUserStoreType {
  user: any;
  token: string;
  isLoggedIn: boolean;
  storeUser: (data: {}) => void;
  storeToken: (token: string) => void;
  logoutUser: () => void;
}

export const useUserStore = create<useUserStoreType>()(
  persist(
    (set) => ({
      user: {},
      token: "",
      isLoggedIn: false,
      storeUser: (data) => set({ user: data, isLoggedIn: true }),
      storeToken: (token) => set({ token: token }),
      logoutUser: () => set({ user: {}, isLoggedIn: false, token: "" }),
    }),
    {
      name: "user",
    }
  )
);
