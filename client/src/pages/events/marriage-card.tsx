import React, { useState } from "react";
import { weedingMappedThemeWithComponents } from "./theme-mapping";
import { Link } from "react-router-dom";

export const MarriageCard = () => {
  const [selectedTheme, setSelectedTheme] = useState<string>(
    weedingMappedThemeWithComponents[0].name
  );

  console.log("Selected Theme", selectedTheme);

  // Find the selected theme's component
  const selectedThemeData = weedingMappedThemeWithComponents.find(
    (theme) => theme.name === selectedTheme
  );

  // Scaling factor for the preview
  const scaleFactor = 1; // Adjust this value as needed

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold text-center mb-12">
        Explore Our Wedding Themes
      </h2>

      {/* Theme Selector */}
      <div className="flex justify-center gap-4 mb-8">
        {weedingMappedThemeWithComponents.map((theme) => (
          <button
            key={theme.name}
            onClick={() => setSelectedTheme(theme.name)}
            className={`px-6 py-2 text-lg font-medium rounded-lg transition-all duration-300 ${
              selectedTheme === theme.name
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {theme.name}
          </button>
        ))}
      </div>

      {/* Theme Preview */}
      {selectedThemeData && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <h3 className="text-2xl font-semibold text-center p-6 bg-gray-50">
            {selectedThemeData.name}
          </h3>

          {/* Scaled Theme Container */}
          <div
            className="relative w-full h-auto overflow-hidden flex justify-center items-center"
            style={{
              transform: `scale(${scaleFactor})`,
              transformOrigin: "top left",
            }}
          >
            <div
              style={{
                width: `${100 / scaleFactor}%`,
                height: `${100 / scaleFactor}%`,
              }}
            >
              {React.createElement(selectedThemeData.component)}
            </div>
          </div>

          <div className="p-6 text-center">
            <Link
              to={`/events/weeding celebration?t=${decodeURIComponent(
                selectedThemeData.name
              )
                .toLowerCase()
                .replace(/ /g, "-")}`}
              className="inline-block px-8 py-3 text-lg font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
              View Full Theme
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarriageCard;
