import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MarriageCards } from "./data";

interface MarriageCardProps extends React.HTMLAttributes<HTMLDivElement> {
  marriageCard: (typeof MarriageCards)[number];
}

export const MarriageCard = ({ marriageCard, ...props }: MarriageCardProps) => {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>{marriageCard.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{marriageCard.description}</p>
        <p>Date: {marriageCard.date}</p>
        <p>Location: {marriageCard.location}</p>
        <p>Guests: {marriageCard.guests.join(", ")}</p>
      </CardContent>
    </Card>
  );
};

export default MarriageCard;
