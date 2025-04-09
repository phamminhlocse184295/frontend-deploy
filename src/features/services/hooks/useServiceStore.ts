import { create } from "zustand";
import { ServiceDto } from "../dto/get-service.dto";

interface ServiceStore {
  services: ServiceDto[];
  setServices: (services: ServiceDto[]) => void;
}

export const useServiceStore = create<ServiceStore>((set) => ({
  services: [],
  setServices: (services) => set({ services }),
}));
