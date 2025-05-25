import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {getReservations, subscribeToReservations} from "../firebase/reservationDB";


export const useReservations = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = subscribeToReservations((reservations) => {
      queryClient.setQueryData(["reservations"], reservations);
    });

    return () => unsubscribe(); 
  }, [queryClient]);

  return useQuery({
    queryKey: ["reservations"],
    queryFn: getReservations,
    
  });
};
