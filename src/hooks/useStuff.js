import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getStuff, subscribeToStuff } from "../firebase/stuffDB";

export const useStuff = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const unsubscribe = subscribeToStuff((stuff) => {
      queryClient.setQueryData(["stuff"], stuff);
    });
    return () => unsubscribe();
  }, [queryClient]);
  return useQuery({
    queryKey: ["stuff"],
    queryFn: getStuff,
  });
};
