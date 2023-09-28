import { ReactNode } from "react";
import DonateLayoutNavbar from "./DonateLayoutNavbar";
import SectionContainer from "@components/sections/SectionContainer";
import Footer from "@components/shared/Footer";

const DonateLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen w-[100vw] flex-col">
      <header className="w-full">
        <DonateLayoutNavbar />
      </header>

      <main className="flex min-h-[90vh] w-full items-center justify-center pb-[5vh] pt-[15vh]">
        {children}
      </main>
      <SectionContainer className="mt-auto">
        <Footer variant="minimal" />
      </SectionContainer>
    </div>
  );
};

export default DonateLayout;
