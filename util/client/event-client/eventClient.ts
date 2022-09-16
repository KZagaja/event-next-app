import axios from "axios";
import { EventAPI } from "../../../types/api/event.types";
import { EventsResponse } from "./eventClient.types";

export const getEvents = async (page?: number) => {
  const { data } = await axios.get<EventsResponse>("/api/event", {
    params: {
      page,
    },
  });
  return data;
};

export const postEvent = async (calendarEvent: EventAPI) => {
  const { data } = await axios.post<EventAPI>("/api/event", calendarEvent);
  return data;
};
