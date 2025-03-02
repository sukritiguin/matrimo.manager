import {
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  Clock,
  MapPin,
  Heart,
  Users,
  Gift,
  Edit,
  Phone,
} from "lucide-react";
import { useState } from "react";

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

export interface HinduWeddingCardProps {
  event: WeddingEvent;
}

export interface WeddingEventFormDataInterface {
  brideName: string;
  brideFatherName: string;
  brideMotherName: string;
  groomName: string;
  groomFatherName: string;
  groomMotherName: string;
  weddingDate: string; // Storing the date in string (ISO format YYYY-MM-DD)
  muhuratTime: string;
  venueName: string;
  venueAddress: string;
  haldiCeremony: { date: string; time: string; venue: string };
  mehendiCeremony: { date: string; time: string; venue: string };
  sangeetCeremony: { date: string; time: string; venue: string };
  reception: { date: string; time: string; venue: string };
  rsvpContact: string;
}

export function SubhBibahaTheme({ event }: HinduWeddingCardProps) {
  const [formData, setFormData] = useState<WeddingEventFormDataInterface>({
    brideName: event.brideName,
    brideFatherName: event.brideFatherName,
    brideMotherName: event.brideMotherName,
    groomName: event.groomName,
    groomFatherName: event.groomFatherName,
    groomMotherName: event.groomMotherName,
    weddingDate: event.weddingDate.toISOString().split("T")[0], // format to YYYY-MM-DD
    muhuratTime: event.muhuratTime,
    venueName: event.venueName,
    venueAddress: event.venueAddress,
    haldiCeremony: {
      date: event.haldiCeremony.date.toISOString().split("T")[0],
      time: event.haldiCeremony.time,
      venue: event.haldiCeremony.venue,
    },
    mehendiCeremony: {
      date: event.mehendiCeremony.date.toISOString().split("T")[0],
      time: event.mehendiCeremony.time,
      venue: event.mehendiCeremony.venue,
    },
    sangeetCeremony: {
      date: event.sangeetCeremony.date.toISOString().split("T")[0],
      time: event.sangeetCeremony.time,
      venue: event.sangeetCeremony.venue,
    },
    reception: {
      date: event.reception.date.toISOString().split("T")[0],
      time: event.reception.time,
      venue: event.reception.venue,
    },
    rsvpContact: event.rsvpContact,
  });

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    const value = e.target.value;

    setFormData((prevData) => {
      // Handle nested keys
      const keys = key.split(".");
      if (keys.length === 1) {
        return { ...prevData, [key]: value };
      }

      // Handle deeper nesting
      return {
        ...prevData,
        [keys[0]]: {
          ...prevData[keys[0] as keyof typeof prevData], // Ensure immutability
          [keys[1]]: value,
        },
      };
    });
  };

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
                      <input
                        type="text"
                        value={formData.brideName}
                        onChange={(e) => handleChange(e, "brideName")}
                        className="bg-transparent text-2xl font-semibold text-gold-700"
                      />
                    </p>
                    <p className="text-lg text-gray-700">
                      Daughter of{" "}
                      <input
                        type="text"
                        value={formData.brideFatherName}
                        onChange={(e) => handleChange(e, "brideFatherName")}
                        className="bg-transparent text-lg text-gray-700"
                      />{" "}
                      &{" "}
                      <input
                        type="text"
                        value={formData.brideMotherName}
                        onChange={(e) => handleChange(e, "brideMotherName")}
                        className="bg-transparent text-lg text-gray-700"
                      />
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
                      <input
                        type="text"
                        value={formData.groomName}
                        onChange={(e) => handleChange(e, "groomName")}
                        className="bg-transparent text-2xl font-semibold text-gold-700"
                      />
                    </p>
                    <p className="text-lg text-gray-700">
                      Son of{" "}
                      <input
                        type="text"
                        value={formData.groomFatherName}
                        onChange={(e) => handleChange(e, "groomFatherName")}
                        className="bg-transparent text-lg text-gray-700"
                      />{" "}
                      &{" "}
                      <input
                        type="text"
                        value={formData.groomMotherName}
                        onChange={(e) => handleChange(e, "groomMotherName")}
                        className="bg-transparent text-lg text-gray-700"
                      />
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
                  <input
                    type="date"
                    value={formData.weddingDate}
                    onChange={(e) => handleChange(e, "weddingDate")}
                    className="bg-transparent text-lg text-gray-700"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <Clock className="w-6 h-6 text-rose-600" />
                  <input
                    type="text"
                    value={formData.muhuratTime}
                    onChange={(e) => handleChange(e, "muhuratTime")}
                    className="bg-transparent text-lg text-gray-700"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-rose-600" />
                  <div>
                    <input
                      type="text"
                      value={formData.venueName}
                      onChange={(e) => handleChange(e, "venueName")}
                      className="bg-transparent text-lg text-gray-700"
                    />
                    <input
                      type="text"
                      value={formData.venueAddress}
                      onChange={(e) => handleChange(e, "venueAddress")}
                      className="bg-transparent text-lg text-gray-700"
                    />
                  </div>
                </div>
              </div>

              {/* Pre-Wedding Ceremonies */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-rose-700">
                  Pre-Wedding Ceremonies
                </h3>
                <div className="flex items-center space-x-4">
                  <Gift className="w-6 h-6 text-rose-600" />
                  <p className="text-lg text-gray-700">
                    Haldi Ceremony:{" "}
                    <input
                      type="date"
                      value={formData.haldiCeremony.date}
                      onChange={(e) => handleChange(e, "haldiCeremony.date")}
                      className="bg-transparent text-lg text-gray-700"
                    />{" "}
                    at{" "}
                    <input
                      type="text"
                      value={formData.haldiCeremony.venue}
                      onChange={(e) => handleChange(e, "haldiCeremony.venue")}
                      className="bg-transparent text-lg text-gray-700"
                    />
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <Gift className="w-6 h-6 text-rose-600" />
                  <p className="text-lg text-gray-700">
                    Mehendi Ceremony:{" "}
                    <input
                      type="date"
                      value={formData.mehendiCeremony.date}
                      onChange={(e) => handleChange(e, "mehendiCeremony.date")}
                      className="bg-transparent text-lg text-gray-700"
                    />{" "}
                    at{" "}
                    <input
                      type="text"
                      value={formData.mehendiCeremony.venue}
                      onChange={(e) => handleChange(e, "mehendiCeremony.venue")}
                      className="bg-transparent text-lg text-gray-700"
                    />
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <Gift className="w-6 h-6 text-rose-600" />
                  <p className="text-lg text-gray-700">
                    Sangeet Ceremony:{" "}
                    <input
                      type="date"
                      value={formData.sangeetCeremony.date}
                      onChange={(e) => handleChange(e, "sangeetCeremony.date")}
                      className="bg-transparent text-lg text-gray-700"
                    />{" "}
                    at{" "}
                    <input
                      type="text"
                      value={formData.sangeetCeremony.venue}
                      onChange={(e) => handleChange(e, "sangeetCeremony.venue")}
                      className="bg-transparent text-lg text-gray-700"
                    />
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-rose-700">Reception</h3>
                <div className="flex items-center space-x-4">
                  <CalendarDays className="w-6 h-6 text-rose-600" />
                  <p className="text-lg text-gray-700">
                    <input
                      type="date"
                      value={formData.reception.date}
                      onChange={(e) => handleChange(e, "reception.date")}
                      className="bg-transparent text-lg text-gray-700"
                    />
                    <input
                      type="time"
                      value={formData.reception.date}
                      onChange={(e) => handleChange(e, "reception.date")}
                      className="bg-transparent text-lg text-gray-700"
                    />
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-rose-600" />
                  <input
                    type="text"
                    value={formData.reception.venue}
                    onChange={(e) => handleChange(e, "reception.venue")}
                    className="bg-transparent text-lg text-gray-700"
                  />
                </div>
              </div>
            </CardContent>
          </div>
        </div>
        {/* Footer */}
        <CardFooter className="flex flex-col items-center border-t border-gold-200 py-6 space-y-4 text-center">
          <Button className="bg-rose-600 hover:bg-rose-700 text-white text-xl flex items-center justify-center px-4 py-2">
            <Phone size={20} />
            <input
              type="text"
              value={formData.rsvpContact}
              onChange={(e) => handleChange(e, "rsvpContact")}
              className="text-xl text-center bg-transparent outline-none"
            />
          </Button>
        </CardFooter>
      </div>
    </div>
  );
}
