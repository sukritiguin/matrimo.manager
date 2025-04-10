export const getDataFromLocalStorage = (key: string) => {
  try {
    if (window === undefined) {
      return null;
    }
    return localStorage.getItem(key);
  } catch {
    console.log("Error getting data from local storage :: " + key);
    return null;
  }
};

export const setDataToLocalStorage = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch {
    console.log("Error setting data to local storage :: " + key);
    return;
  }
};

export const removeDataFromLocalStorage = (key: string) => {
  try {
    console.log("removeDataFromLocalStorage", key);
    localStorage.removeItem(key);
  } catch {
    console.log("Error removing data from local storage :: " + key);
    return;
  }
};
