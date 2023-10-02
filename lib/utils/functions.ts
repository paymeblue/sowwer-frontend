export const formatCurrency = (value: string) => {
  const formattedValue = new Intl.NumberFormat("en-US").format(
    parseInt(value || "0", 10)
  );
  return formattedValue;
};

export const convertBase64toFile = (
  base64: string,
  name: string,
  type: string = "image/png"
) => {
  const base64StringWithoutPrefix = base64.replace(
    /^data:image\/[a-z]+;base64,/,
    ""
  );
  const byteCharacters = atob(base64StringWithoutPrefix);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type }); // You can set the appropriate image type here

  // Create a new File object from the Blob
  const file = new File([blob], name, { type });

  return file;
};
