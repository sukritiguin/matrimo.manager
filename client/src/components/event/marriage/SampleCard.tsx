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

interface HinduWeddingCardProps {
  event: WeddingEvent;
}

export function HinduWeddingCard({ event }: HinduWeddingCardProps) {
  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-rose-100 to-gold-100 p-8">
      <div className="relative w-full max-w-4xl bg-white shadow-2xl rounded-lg overflow-hidden border-2 border-gold-500">
        {/* Fold Line */}
        <div className="absolute inset-y-0 left-1/2 w-1 bg-gold-500 transform -translate-x-1/2"></div>

        {/* Left Side: Invitation Text */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 bg-gradient-to-br from-rose-50 to-gold-50">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-bold text-rose-700">
                ॥ श्री गणेशाय नमः ॥
              </CardTitle>
              <CardTitle className="text-3xl font-bold text-gold-700 mt-4">
                ॥ शुभ विवाह निमंत्रण ॥
              </CardTitle>
            </CardHeader>

            <CardContent className="mt-6 space-y-6">
              <p className="text-lg text-gray-700">
                With the blessings of Lord Ganesha, Goddess Lakshmi, and our
                revered ancestors, we take immense pleasure in inviting you and
                your family to grace the auspicious occasion of the wedding of
                our beloved
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Users className="w-8 h-8 text-rose-600" />
                  <div>
                    <p className="text-2xl font-semibold text-gold-700">
                      {event.brideName}
                    </p>
                    <p className="text-lg text-gray-700">
                      Daughter of {event.brideFatherName} &{" "}
                      {event.brideMotherName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <Heart className="w-8 h-8 text-rose-600" />
                </div>

                <div className="flex items-center space-x-4">
                  <Users className="w-8 h-8 text-rose-600" />
                  <div>
                    <p className="text-2xl font-semibold text-gold-700">
                      {event.groomName}
                    </p>
                    <p className="text-lg text-gray-700">
                      Son of {event.groomFatherName} & {event.groomMotherName}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-lg text-gray-700">
                On this joyous occasion, your presence and blessings will mean
                the world to us as our children embark on their new journey
                together.
              </p>
            </CardContent>
          </div>

          {/* Right Side: Event Details */}
          <div className="p-8 bg-white">
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-rose-700">
                  Wedding Details
                </h3>
                <div className="flex items-center space-x-4">
                  <CalendarDays className="w-6 h-6 text-rose-600" />
                  <p className="text-lg text-gray-700">
                    {formatDate(event.weddingDate)}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Clock className="w-6 h-6 text-rose-600" />
                  <p className="text-lg text-gray-700">
                    Muhurat: {event.muhuratTime}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-rose-600" />
                  <p className="text-lg text-gray-700">
                    {event.venueName}, {event.venueAddress}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-rose-700">
                  Pre-Wedding Ceremonies
                </h3>
                <div className="flex items-center space-x-4">
                  <Gift className="w-6 h-6 text-rose-600" />
                  <p className="text-lg text-gray-700">
                    Haldi: {formatDate(event.haldiCeremony.date)},{" "}
                    {event.haldiCeremony.time}, {event.haldiCeremony.venue}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Gift className="w-6 h-6 text-rose-600" />
                  <p className="text-lg text-gray-700">
                    Mehendi: {formatDate(event.mehendiCeremony.date)},{" "}
                    {event.mehendiCeremony.time}, {event.mehendiCeremony.venue}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Gift className="w-6 h-6 text-rose-600" />
                  <p className="text-lg text-gray-700">
                    Sangeet: {formatDate(event.sangeetCeremony.date)},{" "}
                    {event.sangeetCeremony.time}, {event.sangeetCeremony.venue}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-rose-700">Reception</h3>
                <div className="flex items-center space-x-4">
                  <CalendarDays className="w-6 h-6 text-rose-600" />
                  <p className="text-lg text-gray-700">
                    {formatDate(event.reception.date)}, {event.reception.time}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-rose-600" />
                  <p className="text-lg text-gray-700">
                    {event.reception.venue}
                  </p>
                </div>
              </div>
            </CardContent>
          </div>
        </div>

        {/* Footer */}
        <CardFooter className="flex flex-col items-center border-t border-gold-200 py-6 space-y-4">
          <p className="text-lg text-gray-700">
            With Warm Regards,
            <br />
            [Names of Bride & Groom’s Parents & Family Members]
          </p>
          <Button className="bg-rose-600 hover:bg-rose-700 text-white">
            RSVP: {event.rsvpContact}
          </Button>
        </CardFooter>
      </div>
    </div>
  );
}


