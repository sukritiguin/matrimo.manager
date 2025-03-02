import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { sampleEvent } from "./data";
import { weedingMappedTheme } from "./theme-mapping";
import MarriageCard from "./marriage-card";
import { useGetEventParam } from "./hooks/useGetEventParam";
import { Button } from "@/components/ui/button";

const TemplatePage = React.lazy(() => import("./templete-page"));
// const MarriageCard = React.lazy(() => import("./marriage-card"));

export const EventDetailsPage = () => {
  const eventName = useGetEventParam();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  if (searchParams.get("t")) {
    const themeName = searchParams.get("t");

    console.log("☠️☠️ Getting t values here: ", themeName);

    if (themeName && themeName in weedingMappedTheme) {
      // Check if themeName is a valid key
      type WeddingThemeName = keyof typeof weedingMappedTheme;

      console.log("🤑🤑 Yaah!!! Theme name is present!!!");

      // Now we can safely access the theme
      const selectedTheme = weedingMappedTheme[themeName as WeddingThemeName];

      // Dynamically render the selectedTheme component
      return React.createElement(selectedTheme, { event: sampleEvent });
    } else {
      // Handle invalid themeName or fallback to a default theme
      return <TemplatePage templateName="Default Theme" />;
    }
  }

  if (!eventName) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-xl font-bold text-center">Event Details</h1>
        <p>
          Event not found. Please check the event name and try again.
          <br />
          <br />
          <Button variant="outline" asChild>
            <Link to="/" onClick={() => navigate("/")}>
              Back to Homepage
            </Link>
          </Button>
        </p>
      </div>
    );
  }

  if (eventName === "Wedding Celebration") {
    return <MarriageCard />;
  }
  // TODO: add more events

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-bold text-center">
        Event Details: {eventName}
      </h1>
      <p>Coming soon</p>
    </div>
  );
};

// <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
//   {/* {MarriageCards.map((marriageCard, index) => (
//     <MarriageCard
//       key={index}
//       marriageCard={marriageCard}
//       onClick={() => {
//         navigate(`/events/${eventName}?t=${slugify(marriageCard.name)}`);
//       }}
//     />
//   ))} */}
// </div>
