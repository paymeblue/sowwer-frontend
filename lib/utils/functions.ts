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

export async function imageUrlToBase64(imageUrl: string | null | undefined) {
  if (!imageUrl) return;

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const blob = await response.blob();
    const base64String = await blobToBase64(blob);
    return base64String;
  } catch (error) {
    console.error("Error converting image to Base64:", error);
    return null;
  }
}

// Function to convert a Blob to Base64
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result?.toString()?.split(",")[1];
      if (base64String) {
        resolve(base64String);
      } else {
        reject(new Error("Failed to convert Blob to Base64"));
      }
    };
    reader.onerror = () => {
      reject(new Error("Failed to convert Blob to Base64"));
    };
    reader.readAsDataURL(blob);
  });
}
