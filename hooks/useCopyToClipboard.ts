import { useState } from "react";

type UseCopyToClipboardHook = {
  copied: boolean;
  copyToClipboard: () => void;
};

const useCopyToClipboard = (text?: string): UseCopyToClipboardHook => {
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = () => {
    if (text) {
      const handleCopySuccess = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      };

      const handleCopyError = (error: Error) => {
        console.error("Error copying to clipboard:", error);
      };

      const type = "text/plain";
      const blob = new Blob([text], { type });
      const data = [new ClipboardItem({ [type]: blob })];

      navigator.clipboard.write(data).then(handleCopySuccess, handleCopyError);
    }
  };

  return {
    copied,
    copyToClipboard,
  };
};

export default useCopyToClipboard;
