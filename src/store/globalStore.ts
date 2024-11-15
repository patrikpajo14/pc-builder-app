import { create } from "zustand";
import { Session, User } from "@/types";

type Store = {
  user: User | null;
  session: Session | null;
  setUser: (value: User) => void;
  setSession: (value: Session) => void;
};

const useGlobalStore = create<Store>((set) => ({
  user: null,
  session: null,
  setUser: (value) => set({ user: value }),
  setSession: (value) => set({ session: value }),
}));

export default useGlobalStore;
