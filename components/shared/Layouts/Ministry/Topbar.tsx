"use client";
import ProfileMenuCard from "@components/cards/ProfileMenuCard";

const Topbar = () => {
  return (
    <nav className="topbar">
      <div className="ml-auto">
        <ProfileMenuCard />
      </div>
    </nav>
  );
};

export default Topbar;
