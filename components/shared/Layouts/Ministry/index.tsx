import { ReactNode } from "react";
import LeftSidebar from "./LeftSidebar";
import Topbar from "./Topbar";

const MinistryLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-screen flex-row">
      <LeftSidebar />
      <main className="relative flex w-full flex-col">
        <Topbar />
        <div className="flex h-full max-h-[92vh] flex-row bg-[#F7F8FA]">
          <section className="main-container custom-scrollbar overflow-y-scroll">
            <div className="z-10 h-full w-full self-center">{children}</div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default MinistryLayout;
