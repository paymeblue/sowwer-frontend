import { ReactNode } from "react";
import LeftSidebar from "./LeftSidebar";
import Topbar from "./Topbar";

const MinistryLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-screen flex-row">
      <LeftSidebar />
      <main className="relative flex w-full flex-col">
        <Topbar />
        <div className="flex h-full max-h-[90vh] flex-row">
          <section className="main-container custom-scrollbar overflow-y-scroll">
            <div className="z-10 w-full max-w-5xl self-center">{children}</div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default MinistryLayout;
