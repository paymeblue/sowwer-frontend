"use client";
import ProfileMenuCard from "@components/cards/ProfileMenuCard";
import SectionContainer from "@components/sections/SectionContainer";
import Logo from "@components/shared/Logo";
import useUserAuth from "@hooks/auth/useUserAuth";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";
import Link from "next/link";

const DonateLayoutNavbar = () => {
  const { isAuthenticated } = useUserAuth();
  return (
    <motion.nav
      variants={defaultVariant({})}
      initial="hidden"
      whileInView="visible"
      viewport={DEFAULT_VIEWPORT}
      className="z-30 flex h-fit w-full items-center bg-transparent transition-all duration-200 lg:fixed lg:left-0 lg:top-0 lg:h-[10vh] lg:bg-white lg:shadow-navbar"
    >
      <SectionContainer>
        <div className="flex w-full flex-col items-center lg:flex-row lg:justify-between">
          <Logo />

          {isAuthenticated ? (
            <ProfileMenuCard variant={"landing"} />
          ) : (
            <p className="text_small_body_r">
              Already have an account?{" "}
              <Link href="/auth/donor/sign-in">
                <span className="cursor-pointer font-[500] text-accent transition-all duration-200 hover:underline">
                  Sign in
                </span>
              </Link>
            </p>
          )}
        </div>
      </SectionContainer>
    </motion.nav>
  );
};

export default DonateLayoutNavbar;
