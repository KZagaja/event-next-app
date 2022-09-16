import { FC, useEffect, useRef, useState } from "react";
import { useEvents } from "../../util/client/hooks/useEvents";
import { EventCard } from "./event-card/EventCard";
import { Paginator, PaginatorPageState } from "primereact/paginator";
import { Toast } from "primereact/toast";
import { ResponseEventAPI } from "../../util/client/event-client/eventClient.types";
import { clientDictionary } from "../../dictionary/client/clientDictionary";

export const EventList: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [events, setEvents] = useState<ResponseEventAPI[] | undefined>(
    undefined
  );
  const [amountOfEvents, setAmountOfEvents] = useState<number | undefined>(
    undefined
  );
  const { data, isLoading, isError } = useEvents(currentPage / 10);

  const onPageChange = (e: PaginatorPageState) => {
    setCurrentPage(e.first);
  };

  useEffect(() => {
    if (!isLoading) {
      setEvents(data?.events);
      setAmountOfEvents(data?.amountOfEvents);
    }
  }, [data, isLoading]);

  const toast = useRef<Toast>(null);
  if (isError && toast.current) {
    toast.current.show({
      severity: "error",
      summary: clientDictionary.toast.summary.error,
      detail: clientDictionary.toast.details.errorGetEvents,
    });
  }

  return (
    <div>
      <Toast ref={toast} />
      <div className="output-container">
        {events?.map((event) => (
          <EventCard
            key={event.id}
            firstName={event.firstName}
            lastName={event.lastName}
            email={event.email}
            eventDate={event.eventDate}
          />
        ))}
      </div>
      <Paginator
        rows={10}
        first={currentPage}
        totalRecords={amountOfEvents}
        onPageChange={onPageChange}
      />
    </div>
  );
};
