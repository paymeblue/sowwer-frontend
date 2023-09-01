"use client";
import { Fragment, ReactNode, useEffect } from "react";

const ScrollToTop = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return <Fragment>{children}</Fragment>;
};

export default ScrollToTop;
