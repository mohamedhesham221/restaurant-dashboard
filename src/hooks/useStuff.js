import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getStuff, subscribeToStuff } from "../firebase/stuffDB";

export const useStuff = () => {
  const queryClient = useQueryClient(); // Access the query client
  // Subscribe to real-time updates
  useEffect(() => {
    const unsubscribe = subscribeToStuff((stuff) => {
      queryClient.setQueryData(["stuff"], stuff);
    });
    return () => unsubscribe();
  }, [queryClient]);
  // Fetch the stuff data
  return useQuery({
    queryKey: ["stuff"],
    queryFn: getStuff,
  });
};
