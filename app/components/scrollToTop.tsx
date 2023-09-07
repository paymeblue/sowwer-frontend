"use client";
import { Fragment, ReactNode, useEffect } from "react";

const ScrollToTop = ({ children }: { children: ReactNode }) => {
  // const resetWindowScrollPosition = useCallback(
  //   () => window.scrollTo({ top: 0, left: 0, behavior: "instant" }),
  //   []
  // );

  // useEffect(() => {
  //   window.onbeforeunload = function () {
  //     resetWindowScrollPosition();
  //   };
  // }, [resetWindowScrollPosition]);
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  return <Fragment>{children}</Fragment>;
};

export default ScrollToTop;
