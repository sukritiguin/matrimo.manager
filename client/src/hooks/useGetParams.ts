import { useParams } from "react-router-dom";

export const useGetParams = <T extends string[]>(keys: T): Record<T[number], string | null> => {
  const params = useParams();
  const result = {} as Record<T[number], string | null>;

  keys.forEach((key) => {
    result[key as T[number]] = params[key] ?? null;
  });

  return result;
};
