export const MarriageCards = [
  {
    name: "template 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget viverra ligula. Sed in arcu vel ipsum facilisis facilisis at vitae lectus.",
    date: "2022-12-15",
    location: "New York, USA",
    guests: ["John Doe", "Jane Smith"],
  },
  {
    name: "template 2",
    description:
      "Phasellus euismod orci nec tellus tincidunt, non fermentum velit tristique. Integer ac tortor vel mauris tristique consectetur.",
    date: "2023-01-10",
    location: "Los Angeles, USA",
    guests: ["Jane Doe", "Michael Johnson"],
  },
  // Add more marriage cards here...
];

export const Events = [
  {
    id: 1,
    name: "Marriage",
    description: "Marriage Event Description",
  },
  {
    id: 2,
    name: "Birthday",
    description: "Birthday Event Description",
  },
  {
    id: 3,
    name: "Funeral",
    description: "Funeral Event Description",
  },
] as const;
