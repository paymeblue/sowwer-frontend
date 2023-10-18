"use client";
import ProfileMenuCard from "@components/cards/ProfileMenuCard";

const Topbar = () => {
  return (
    <nav className="topbar">
      <div className="ml-auto">
        <ProfileMenuCard variant="ministry" />
      </div>
    </nav>
  );
};

export default Topbar;
