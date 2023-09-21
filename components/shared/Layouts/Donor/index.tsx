import SectionContainer from "@components/sections/SectionContainer";
import Footer from "@components/shared/Footer";
import Navbar from "@components/shared/Navbar";
import { ReactNode } from "react";

const DonorLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen w-[100vw] flex-col">
      <header className="w-full">
        <Navbar variant="donor" authenticated />
      </header>
      <main className="mb-10 w-full">{children}</main>
      <SectionContainer className="mt-auto">
        <Footer variant="minimal" />
      </SectionContainer>
    </div>
  );
};

export default DonorLayout;
