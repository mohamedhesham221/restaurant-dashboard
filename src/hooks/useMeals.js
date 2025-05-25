import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {getMeals, subscribeToMeals} from "../firebase/mealsDB";


export const useMeals = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = subscribeToMeals((meals) => {
      queryClient.setQueryData(["meals"], meals);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [queryClient]);

  return useQuery({
    queryKey: ["meals"],
    queryFn: getMeals,
  });
};
