import React from "react";
import { slugify } from "@/lib/slugify";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MarriageCard } from "./marriage-card";
import { MarriageCards } from "./data";

export const TemplatePage = ({
  templateName,
}: {
  templateName: string | null;
}) => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const [searchParams] = useSearchParams();
  const isEditable = searchParams.get("edit") === "true";

  if (!templateName) {
    return <h1>Please Select a Template -</h1>;
  }

  const marriageCard = MarriageCards.find(
    (marriageCard) => slugify(marriageCard.name) === templateName
  );

  function handleEditCard() {
    navigate(`${pathname}?t=${templateName}&edit=true`);
  }

  function handleSave() {
    navigate(`${pathname}?t=${templateName}&user=userName`);
  }

  if (!marriageCard) {
    return <h1>Template Not Found -</h1>;
  }

  return (
    <React.Fragment>
      <div className="w-full flex justify-end">
        <div>
          {isEditable ? (
            <Button variant="primary" onClick={handleSave}>
              Save template
            </Button>
          ) : (
            <Button variant="primary" onClick={handleEditCard}>
              Edit Card
            </Button>
          )}
        </div>
      </div>
      <MarriageCard marriageCard={marriageCard} />
    </React.Fragment>
  );
};

export default TemplatePage;
