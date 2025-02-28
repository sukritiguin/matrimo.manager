import { sampleEvent } from "@/pages/events/data";
import { ClassicEleganceTheme } from "../ClassicEleganceTheme";
import { ElegantWeddingsTheme } from "../ElegantWeddingsTheme";
import { SubhBibahaTheme } from "../SubhBibahaTheme";

export const ClassicEleganceThemePreview = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <ClassicEleganceTheme event={sampleEvent} />
    </div>
  );
};

export const ElegantWeddingsThemePreview = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <ElegantWeddingsTheme event={sampleEvent} />
    </div>
  );
};

export const SubhBibahaThemePreview = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <SubhBibahaTheme event={sampleEvent} />
    </div>
  );
};
