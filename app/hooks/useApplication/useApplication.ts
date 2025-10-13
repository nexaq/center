import {useQuery} from "@tanstack/react-query";
import {getApplication} from "~/api/application/getApplication";
import {useParams} from "react-router";

export const useApplication = () => {
  const { id } = useParams();
  return useQuery({
    queryKey: ['application', Number(id)],
    queryFn: () => {
      return getApplication(Number(id));
    },
  });
}