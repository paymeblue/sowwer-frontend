"use client";
import { Fragment, ReactNode, useCallback, useEffect } from "react";

const ScrollToTop = ({ children }: { children: ReactNode }) => {
  const resetWindowScrollPosition = useCallback(
    () => window.scrollTo(0, 0),
    []
  );

  useEffect(() => {
    window.onbeforeunload = function () {
      resetWindowScrollPosition();
    };
  }, [resetWindowScrollPosition]);
  // useEffect(() => {
  //   window.history.scrollRestoration = "manual";
  // }, []);

  return <Fragment>{children}</Fragment>;
};

export default ScrollToTop;
