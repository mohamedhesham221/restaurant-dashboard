import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getInventory, subscribeToInventory } from "../firebase/inventoryDB";
export const useInventory = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const unsubscribe = subscribeToInventory((inventory) => {
      queryClient.setQueryData(["inventory"], inventory);
    });
    return () => unsubscribe();
  }, [queryClient]);
  return useQuery({
    queryKey: ["inventory"],
    queryFn: getInventory,
  });
};
