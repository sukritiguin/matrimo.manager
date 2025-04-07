import ms from "ms";

export const addDate = (interval: string, date?: Date) => {
  const diff = ms(interval as ms.StringValue);
  if (date) {
    return new Date(date.getTime() + diff);
  }

  return new Date(Date.now() + diff);
};
