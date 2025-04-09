import { create } from "zustand";
import { UserDto } from "../dto/get-user.dto";

interface UserStore {
  users: UserDto[];
  setUsers: (users: UserDto[]) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
}));
