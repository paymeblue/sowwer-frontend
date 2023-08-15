const capitalizeFirstLetters = (sentence: string): string => {
  if (typeof sentence !== "string" || sentence.length === 0) {
    return sentence; // Return unchanged if not a string or an empty string
  }

  return sentence.replace(/(^\w|\s\w)/g, (match) => match.toUpperCase());
};
export default capitalizeFirstLetters;
