import { useEffect, useState } from "react";

const useNavBg = () => {
  const [clientWindowHeight, setClientWindowHeight] = useState<number>(0);
  const [backgroundTransparent, setBackgroundTransparent] = useState<number>(0);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    setClientWindowHeight(window.scrollY);
  };

  useEffect(() => {
    const backgroundTransparentVar = clientWindowHeight / 600;

    if (backgroundTransparentVar < 1) {
      setBackgroundTransparent(backgroundTransparentVar);
    }
  }, [clientWindowHeight]);
  return backgroundTransparent;
};

export default useNavBg;
