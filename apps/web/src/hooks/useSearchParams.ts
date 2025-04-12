import { useRouter } from "@tanstack/react-router";

export const useSearchParams = (keys: string[]): string[] => {
  const { latestLocation } = useRouter();

  const searchParams = latestLocation.search as any;

  return keys.map((key) => searchParams[key] ?? "");
};
