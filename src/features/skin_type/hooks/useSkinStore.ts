import { create } from "zustand";
import { SkinDto } from "../dto/skin.dto";

interface SkinStore {
  skins: SkinDto[];
  setSkins: (skins: SkinDto[]) => void;
}

export const useSkinStore = create<SkinStore>((set) => ({
  skins: [],
  setSkins: (skins) => set({ skins }),
}));
