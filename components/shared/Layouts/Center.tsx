import { ReactNode } from "react";
import Logo from "../Logo";

const CenterLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
      <header>
        <Logo />
      </header>
      <main className="flex w-full items-center justify-center">
        {children}
      </main>

      <footer className="mt-auto flex w-full justify-between border-t border-black px-4 py-4">
        <span className="text_small_body_sb">
          © 2023 Soower. All rights reserved.
        </span>
      </footer>
    </div>
  );
};

export default CenterLayout;
