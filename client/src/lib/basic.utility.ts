export function convertToTitleCase(str: string) {
  return str
    .split("-") // Split the string by hyphen
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join the words with space
}
