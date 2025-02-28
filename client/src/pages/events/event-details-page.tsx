import React from "react";
import { slugify } from "@/lib/slugify";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Events, MarriageCards, sampleEvent } from "./data";
import { weedingMappedTheme } from "./theme-mapping";
import { convertToTitleCase } from "@/lib/basic.utility";
import MarriageCard from "./marriage-card";

const TemplatePage = React.lazy(() => import("./templete-page"));
// const MarriageCard = React.lazy(() => import("./marriage-card"));

export const EventDetailsPage = () => {
  const params = useParams();
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

  const eventName = params["event"];

  const isValidEvent = Object.values(Events).some(
    (event) => event.name.toLowerCase() === eventName
  );

  if (!eventName || !isValidEvent) {
    return <h1>Event Not Found</h1>;
  }

  return (
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
    <MarriageCard />
  );
};
