import { ClassicEleganceTheme } from "@/components/event/marriage/ClassicEleganceTheme";
import { SubhBibahaTheme } from "@/components/event/marriage/editible/SubhBibahaTheme";
import { ElegantWeddingsTheme } from "@/components/event/marriage/ElegantWeddingsTheme";
import {
  ClassicEleganceThemePreview,
  ElegantWeddingsThemePreview,
  SubhBibahaThemePreview,
} from "@/components/event/marriage/preview/ThemePreviews";
// import { SubhBibahaTheme } from "@/components/event/marriage/SubhBibahaTheme";

export const weedingMappedTheme = {
  "elegent-wedding-theme": ElegantWeddingsTheme,
  "classic-elegence-theme": ClassicEleganceTheme,
  "subh-bibaha-theme": SubhBibahaTheme,
};

interface ThemePreviewInterface {
  name: string;
  component: React.ComponentType<any>;
}

export const weedingMappedThemeWithComponents: ThemePreviewInterface[] = [
  { name: "Elegent Wedding Theme", component: ElegantWeddingsThemePreview },
  { name: "Classic Elegence Theme", component: ClassicEleganceThemePreview },
  { name: "Subh Bibaha Theme", component: SubhBibahaThemePreview },
];
