import { FC } from "react";
import { Card } from "primereact/card";

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  eventDate: string;
}

export const EventCard: FC<Props> = ({
  firstName,
  lastName,
  email,
  eventDate,
}) => {
  const dateOfEvent = new Date(eventDate).toLocaleString();
  const subTitle = firstName + " " + lastName;

  return (
    <Card
      title={dateOfEvent}
      subTitle={subTitle}
      style={{ marginBottom: "0.5rem" }}
    >
      {email}
    </Card>
  );
};
