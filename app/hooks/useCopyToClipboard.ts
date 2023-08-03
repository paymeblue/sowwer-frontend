import { useState } from "react";

type UseCopyToClipboardHook = {
  copied: boolean;
  copyToClipboard: () => void;
};

const useCopyToClipboard = (text: string): UseCopyToClipboardHook => {
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = () => {
    const handleCopySuccess = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    };

    const handleCopyError = () => {
      console.log("Error copying to clipboard");
    };

    const type = "text/plain";
    const blob = new Blob([text], { type });
    const data = [new ClipboardItem({ [type]: blob })];

    navigator.clipboard.write(data).then(handleCopySuccess, handleCopyError);
  };

  return {
    copied,
    copyToClipboard,
  };
};

export default useCopyToClipboard;
