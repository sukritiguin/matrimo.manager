import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, MapPin, Heart, Users, Gift } from "lucide-react";

interface WeddingEvent {
  brideName: string;
  brideFatherName: string;
  brideMotherName: string;
  groomName: string;
  groomFatherName: string;
  groomMotherName: string;
  weddingDate: Date;
  muhuratTime: string;
  venueName: string;
  venueAddress: string;
  haldiCeremony: { date: Date; time: string; venue: string };
  mehendiCeremony: { date: Date; time: string; venue: string };
  sangeetCeremony: { date: Date; time: string; venue: string };
  reception: { date: Date; time: string; venue: string };
  rsvpContact: string;
}

interface ElegantWeddingCardProps {
  event: WeddingEvent;
}

export function ElegantWeddingsTheme({ event }: ElegantWeddingCardProps) {
  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-200 to-gray-400 p-8">
      <div className="relative w-full max-w-4xl bg-white shadow-xl rounded-lg overflow-hidden border-2 border-gray-300">
        {/* Fold Line */}
        <div className="absolute inset-y-0 left-1/2 w-1 bg-gray-300 transform -translate-x-1/2"></div>

        {/* Left Side: Invitation Text */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-200">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-semibold text-gray-800">
                ✨ Wedding Invitation ✨
              </CardTitle>
              <CardTitle className="text-3xl font-semibold text-gray-700 mt-4">
                ♥ Join Us for the Celebration ♥
              </CardTitle>
            </CardHeader>

            <CardContent className="mt-6 space-y-6">
              <p className="text-lg text-gray-700">
                With the love and blessings of our dear family, we invite you to
                witness the sacred union of our beloved
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Users className="w-8 h-8 text-gray-600" />
                  <div>
                    <p className="text-2xl font-semibold text-gray-800">
                      {event.brideName}
                    </p>
                    <p className="text-lg text-gray-700">
                      Daughter of {event.brideFatherName} &{" "}
                      {event.brideMotherName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <Heart className="w-8 h-8 text-gray-600" />
                </div>

                <div className="flex items-center space-x-4">
                  <Users className="w-8 h-8 text-gray-600" />
                  <div>
                    <p className="text-2xl font-semibold text-gray-800">
                      {event.groomName}
                    </p>
                    <p className="text-lg text-gray-700">
                      Son of {event.groomFatherName} & {event.groomMotherName}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-lg text-gray-700">
                We would be honored to have you celebrate this unforgettable day
                with us as our families unite in joy and love.
              </p>
            </CardContent>
          </div>

          {/* Right Side: Event Details */}
          <div className="p-8 bg-white">
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Wedding Details
                </h3>
                <div className="flex items-center space-x-4">
                  <CalendarDays className="w-6 h-6 text-gray-600" />
                  <p className="text-lg text-gray-700">
                    {formatDate(event.weddingDate)}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Clock className="w-6 h-6 text-gray-600" />
                  <p className="text-lg text-gray-700">
                    Muhurat: {event.muhuratTime}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-gray-600" />
                  <p className="text-lg text-gray-700">
                    {event.venueName}, {event.venueAddress}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Pre-Wedding Ceremonies
                </h3>
                <div className="flex items-center space-x-4">
                  <Gift className="w-6 h-6 text-gray-600" />
                  <p className="text-lg text-gray-700">
                    Haldi: {formatDate(event.haldiCeremony.date)},{" "}
                    {event.haldiCeremony.time}, {event.haldiCeremony.venue}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Gift className="w-6 h-6 text-gray-600" />
                  <p className="text-lg text-gray-700">
                    Mehendi: {formatDate(event.mehendiCeremony.date)},{" "}
                    {event.mehendiCeremony.time}, {event.mehendiCeremony.venue}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Gift className="w-6 h-6 text-gray-600" />
                  <p className="text-lg text-gray-700">
                    Sangeet: {formatDate(event.sangeetCeremony.date)},{" "}
                    {event.sangeetCeremony.time}, {event.sangeetCeremony.venue}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Reception
                </h3>
                <div className="flex items-center space-x-4">
                  <CalendarDays className="w-6 h-6 text-gray-600" />
                  <p className="text-lg text-gray-700">
                    {formatDate(event.reception.date)}, {event.reception.time}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-gray-600" />
                  <p className="text-lg text-gray-700">
                    {event.reception.venue}
                  </p>
                </div>
              </div>
            </CardContent>
          </div>
        </div>

        {/* Footer */}
        <CardFooter className="flex flex-col items-center border-t border-gray-300 py-6 space-y-4">
          <p className="text-lg text-gray-700">
            Warm Regards, <br />
            [Names of Bride & Groom’s Parents & Family Members]
          </p>
          <Button className="bg-gray-600 hover:bg-gray-700 text-white">
            RSVP: {event.rsvpContact}
          </Button>
        </CardFooter>
      </div>
    </div>
  );
}
