export type ResponseEventAPI = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  eventDate: string;
};

export type EventsResponse = {
  amountOfEvents: number;
  events: ResponseEventAPI[];
};
