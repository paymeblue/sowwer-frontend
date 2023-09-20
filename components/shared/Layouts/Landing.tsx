import { ReactNode } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";

const LandingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen w-[100vw] flex-col">
      <header className="w-full">
        <Navbar />
      </header>
      <main className="w-full">{children}</main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
