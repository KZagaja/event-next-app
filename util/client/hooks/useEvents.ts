import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../query-keys/queryKeys";
import { getEvents } from "../event-client/eventClient";

export const useEvents = (page?: number) => {
  const { data, isError, isLoading } = useQuery([queryKeys.events, page], () =>
    getEvents(page)
  );

  return { data, isError, isLoading };
};
