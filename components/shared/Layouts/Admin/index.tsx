"use client";
import { ReactNode, useEffect } from "react";
import LeftSidebar from "./LeftSidebar";
import Topbar from "./Topbar";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    document.body.classList.add("body_on_center_layout");

    // Remove the class from the body element when the component unmounts
    return () => {
      document.body.classList.remove("body_on_center_layout");
    };
  }, []);
  return (
    <div className="flex h-screen w-screen flex-row overflow-y-hidden">
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

export default AdminLayout;
