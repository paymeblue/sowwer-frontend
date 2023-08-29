export const readAsDataURL = (
  file: File
): Promise<string | ArrayBuffer | null> => {
  return new Promise<string | ArrayBuffer | null>((resolve) => {
    const fileReader = new FileReader();
    fileReader.onload = (fileLoadedEvent) => {
      resolve(fileLoadedEvent?.target?.result ?? null);
    };
    fileReader.readAsDataURL(file);
  });
};
