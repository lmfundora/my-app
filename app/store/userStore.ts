import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserStore {
  data: User;
  logIn: (param: User) => void;
  logOut: () => void;
}

interface User {
  id: string;
  user_name: string;
  phone: string;
  email: string;
  token: string;
  refreshToken: string;
}

export const userStore = create<UserStore>()(
  persist(
    (set, get) => ({
      data: {
        id: "",
        email: "",
        phone: "",
        user_name: "",
        token: "",
        refreshToken: "",
      },
      logIn: (data: User) => set({ data: (get().data = data) }),
      logOut: () =>
        set({
          data: (get().data = {
            id: "",
            user_name: "",
            phone: "",
            email: "",
            token: "",
            refreshToken: "",
          }),
        }),
    }),
    {
      name: "user_store", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
