import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {getOrders, subscribeToOrders} from "../firebase/ordersDB";


export const useOrders = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = subscribeToOrders((orders) => {
      queryClient.setQueryData(["orders"], orders);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [queryClient]);

  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
    
  });
};
