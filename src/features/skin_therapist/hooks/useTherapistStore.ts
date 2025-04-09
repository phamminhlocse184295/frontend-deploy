import { create } from "zustand";
import { TherapistDto } from "../dto/get-therapist.dto";

interface TherapistStore {
  therapists: TherapistDto[];
  setTherapists: (therapists: TherapistDto[]) => void;
}

export const useTherapistStore = create<TherapistStore>((set) => ({
  therapists: [],
  setTherapists: (therapists) => set({ therapists }),
}));
