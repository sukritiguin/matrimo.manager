import React from "react";
import { slugify } from "@/lib/slugify";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Events, MarriageCards } from "./data";

const TemplatePage = React.lazy(() => import("./templete-page"));
const MarriageCard = React.lazy(() => import("./marriage-card"));

export const EventDetailsPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  if (searchParams.get("t")) {
    return <TemplatePage templateName={searchParams.get("t")} />;
  }
  const eventName = params["event"];

  const isValidEvent = Object.values(Events).some(
    (event) => event.name.toLowerCase() === eventName
  );

  if (!eventName || !isValidEvent) {
    return <h1>Event Not Found</h1>;
  }

  return (
    <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {MarriageCards.map((marriageCard, index) => (
        <MarriageCard
          key={index}
          marriageCard={marriageCard}
          onClick={() => {
            navigate(`/events/${eventName}?t=${slugify(marriageCard.name)}`);
          }}
        />
      ))}
    </div>
  );
};
