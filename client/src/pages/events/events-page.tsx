import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Events } from "./data";
import { slugify } from "@/lib/slugify";

export const EventsPage = () => {
  return (
    <div
      className="min-h-screen p-8"
      // style={{ backgroundColor: "var(--primary-off-white)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <h1
          className="text-4xl font-bold mb-8 text-center text-white"
          // style={{ color: "var(--primary-maroon)" }}
        >
          Upcoming Events
        </h1>

        {/* Events Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </div>
    </div>
  );
};

const EventCard = (event: (typeof Events)[number]) => {
  const navigate = useNavigate();

  return (
    <Card
      className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl"
      // style={{
      //   backgroundColor: "var(--primary-off-white)",
      //   borderColor: "var(--accent-charcoal-gray)",
      // }}
      onClick={() => navigate(`/events/${slugify(event.name)}`)}
    >
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-white">
          {event.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p
          className="text-lg mb-4"
          style={{ color: "var(--accent-charcoal-gray)" }}
        >
          {event.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-amber-100">
            Learn More →
          </span>
          <span className="text-sm text-amber-100">{}</span>
        </div>
      </CardContent>
    </Card>
  );
};
