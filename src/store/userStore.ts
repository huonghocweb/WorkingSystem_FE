import { create } from "zustand";
import { UserRole } from "../types/user";

export interface User {
  userId: number;
  username: string;
  email: string;
  fullname: string;
  authorities: UserRole[];
}
interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
