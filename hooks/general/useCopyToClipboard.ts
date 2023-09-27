interface IUseCopyToClipboard {
  onSuccess?: () => void;
  onFailure?: () => void;
}

const useCopyToClipboard = ({ onSuccess, onFailure }: IUseCopyToClipboard) => {
  const copyToClipboard = (text: string) => {
    if (text) {
      const type = "text/plain";
      const blob = new Blob([text], { type });
      const data = [new ClipboardItem({ [type]: blob })];

      navigator.clipboard.write(data).then(onSuccess, onFailure);
    }
  };

  return {
    copyToClipboard,
  };
};

export default useCopyToClipboard;
