import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ServiceDto } from "../dto/get-service.dto";

const fetchServiceBySkinTherapistId = async (
  skintherapistId: number
): Promise<ServiceDto[]> => {
  if (!skintherapistId) throw new Error("SkinTherapistId is needed");

  const response = await axios.get<ServiceDto[]>(
    `https://skincareservicebooking.onrender.com/api/service/getServiceBySkintherapistId/${skintherapistId}`
  );
  return response.data;
};

export const useGetServiceByTherapistId = (skintherapistId: number) => {
  return useQuery<ServiceDto[], Error>({
    queryKey: ["getServiceBySkintherapistId", skintherapistId],
    queryFn: () => fetchServiceBySkinTherapistId(skintherapistId),
    enabled: !!skintherapistId,
  });
};
