import {
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

interface HinduWeddingCardProps {
  event: WeddingEvent;
}

export function ClassicEleganceTheme({ event }: HinduWeddingCardProps) {
  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-bl from-teal-200 to-emerald-300 p-10">
      <div className="relative w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden border-4 border-teal-600">
        {/* Fold Line */}
        <div className="absolute inset-y-0 left-1/2 w-1 bg-teal-600 transform -translate-x-1/2"></div>

        {/* Left Side: Invitation Text */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 bg-gradient-to-br from-teal-50 to-teal-100">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-semibold text-teal-800">
                ✨ With Blessings from Above ✨
              </CardTitle>
              <CardTitle className="text-4xl font-semibold text-teal-600 mt-4">
                Wedding Invitation
              </CardTitle>
            </CardHeader>

            <CardContent className="mt-6 space-y-6">
              <p className="text-lg text-gray-800">
                It is with great joy and excitement that we invite you to
                celebrate the union of our beloved
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Users className="w-8 h-8 text-teal-600" />
                  <div>
                    <p className="text-2xl font-bold text-teal-700">
                      {event.brideName}
                    </p>
                    <p className="text-lg text-gray-700">
                      Daughter of {event.brideFatherName} &{" "}
                      {event.brideMotherName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <Heart className="w-8 h-8 text-teal-600" />
                </div>

                <div className="flex items-center space-x-4">
                  <Users className="w-8 h-8 text-teal-600" />
                  <div>
                    <p className="text-2xl font-bold text-teal-700">
                      {event.groomName}
                    </p>
                    <p className="text-lg text-gray-700">
                      Son of {event.groomFatherName} & {event.groomMotherName}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-lg text-gray-800">
                Your presence will be a cherished blessing on this special
                occasion as we join hands to celebrate this joyous union.
              </p>
            </CardContent>
          </div>

          {/* Right Side: Event Details */}
          <div className="p-8 bg-teal-50">
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-teal-800">
                  Wedding Details
                </h3>
                <div className="flex items-center space-x-4">
                  <CalendarDays className="w-6 h-6 text-teal-600" />
                  <p className="text-lg text-gray-800">
                    {formatDate(event.weddingDate)}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Clock className="w-6 h-6 text-teal-600" />
                  <p className="text-lg text-gray-800">
                    Muhurat: {event.muhuratTime}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-teal-600" />
                  <p className="text-lg text-gray-800">
                    {event.venueName}, {event.venueAddress}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-teal-800">
                  Pre-Wedding Ceremonies
                </h3>
                <div className="flex items-center space-x-4">
                  <Gift className="w-6 h-6 text-teal-600" />
                  <p className="text-lg text-gray-800">
                    Haldi: {formatDate(event.haldiCeremony.date)},{" "}
                    {event.haldiCeremony.time}, {event.haldiCeremony.venue}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Gift className="w-6 h-6 text-teal-600" />
                  <p className="text-lg text-gray-800">
                    Mehendi: {formatDate(event.mehendiCeremony.date)},{" "}
                    {event.mehendiCeremony.time}, {event.mehendiCeremony.venue}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Gift className="w-6 h-6 text-teal-600" />
                  <p className="text-lg text-gray-800">
                    Sangeet: {formatDate(event.sangeetCeremony.date)},{" "}
                    {event.sangeetCeremony.time}, {event.sangeetCeremony.venue}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-teal-800">
                  Reception
                </h3>
                <div className="flex items-center space-x-4">
                  <CalendarDays className="w-6 h-6 text-teal-600" />
                  <p className="text-lg text-gray-800">
                    {formatDate(event.reception.date)}, {event.reception.time}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-teal-600" />
                  <p className="text-lg text-gray-800">
                    {event.reception.venue}
                  </p>
                </div>
              </div>
            </CardContent>
          </div>
        </div>

        {/* Footer */}
        <CardFooter className="flex flex-col items-center border-t border-teal-200 py-6 space-y-4">
          <p className="text-lg text-gray-800">
            With Best Wishes, <br />
            [Names of Bride & Groom’s Parents & Family Members]
          </p>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            RSVP: {event.rsvpContact}
          </Button>
        </CardFooter>
      </div>
    </div>
  );
}
