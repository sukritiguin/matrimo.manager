import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Events } from "./data";

export const EventsPage = () => {
  return (
    <React.Fragment>
      <h1 className="text-3xl py-3">Events Page</h1>
      <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>
    </React.Fragment>
  );
};

const EventCard = (event: (typeof Events)[number]) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/events/${event.name.toLowerCase()}`)}>
      <CardHeader>
        <CardTitle>{event.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{event.description}</p>
        {/** Add more details here */}
      </CardContent>
    </Card>
  );
};
