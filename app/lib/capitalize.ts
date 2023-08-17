const capitalizeFirstLetters = (sentence?: string | null): string => {
  if (!sentence || typeof sentence !== "string" || sentence.length === 0) {
    return sentence || ""; // Return unchanged if not a string or an empty string
  }

  return sentence.replace(/(^\w|\s\w)/g, (match) => match.toUpperCase());
};

export default capitalizeFirstLetters;

export const truncateTextWithEllipsis = (
  maxLetterCount: number,
  text?: string | null
): string => {
  if (!text || text.length <= maxLetterCount) {
    return text || "";
  }

  const truncatedText = text.substring(0, maxLetterCount - 3); // -3 for the ellipsis
  return truncatedText + "...";
};
