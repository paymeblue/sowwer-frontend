import { RcFile } from "antd/es/upload";

export const getBase64 = (file: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(file);
  return reader.result;
};
