export const MarriageCards = [
  {
    name: "Subh Bibaha Theme",
    description:
      "A timeless wedding invitation design featuring a sophisticated layout and graceful typography, perfect for a traditional yet modern celebration.",
    date: "2022-12-15",
    location: "New York, USA",
    guests: ["John Doe", "Jane Smith"],
  },
  {
    name: "Classic Elegence Theme",
    description:
      "An elegant and contemporary wedding card designed with refined aesthetics, ideal for couples who appreciate simplicity with a touch of luxury.",
    date: "2023-01-10",
    location: "Los Angeles, USA",
    guests: ["Jane Doe", "Michael Johnson"],
  },
  {
    name: "Elegent Wedding Theme",
    description:
      "An elegant and contemporary wedding card designed with refined aesthetics, ideal for couples who appreciate simplicity with a touch of luxury.",
    date: "2023-01-10",
    location: "Los Angeles, USA",
    guests: ["Jane Doe", "Michael Johnson"],
  },
  // Additional templates can be added here...
];

export const Events = [
  {
    id: 1,
    name: "Wedding Celebration",
    description:
      "A joyous occasion celebrating the union of two individuals in the presence of loved ones.",
  },
  {
    id: 2,
    name: "Birthday Celebration",
    description:
      "A special day to honor and celebrate another year of life with friends and family.",
  },
  {
    id: 3,
    name: "Memorial Service",
    description:
      "A solemn gathering to commemorate and pay tribute to the life and legacy of a loved one.",
  },
] as const;

export const sampleEvent = {
  brideName: "Ananya Sharma",
  brideFatherName: "Rajesh Sharma",
  brideMotherName: "Sunita Sharma",
  groomName: "Rohan Mehta",
  groomFatherName: "Amit Mehta",
  groomMotherName: "Neeta Mehta",
  weddingDate: new Date(2025, 3, 15), // April 15, 2025
  muhuratTime: "7:30 PM",
  venueName: "Grand Palace Banquet",
  venueAddress: "MG Road, Bengaluru, India",
  haldiCeremony: {
    date: new Date(2025, 3, 13), // April 13, 2025
    time: "10:00 AM",
    venue: "Sharma Residence, Indiranagar, Bengaluru",
  },
  mehendiCeremony: {
    date: new Date(2025, 3, 13), // April 13, 2025
    time: "4:00 PM",
    venue: "Sharma Residence, Indiranagar, Bengaluru",
  },
  sangeetCeremony: {
    date: new Date(2025, 3, 14), // April 14, 2025
    time: "7:00 PM",
    venue: "The Royal Ballroom, JP Nagar, Bengaluru",
  },
  reception: {
    date: new Date(2025, 3, 16), // April 16, 2025
    time: "8:00 PM",
    venue: "The Grand Hyatt, Bengaluru",
  },
  rsvpContact: "+91 98765 43210",
};
