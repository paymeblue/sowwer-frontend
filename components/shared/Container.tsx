import React, { ReactNode } from "react";

type Props = { children: ReactNode; className?: string };

const Container = ({ children, className }: Props) => {
  return (
    <main className={`mx-auto max-w-[1440px] px-4 tablet:px-20 ${className}`}>
      {children}
    </main>
  );
};

export default Container;
