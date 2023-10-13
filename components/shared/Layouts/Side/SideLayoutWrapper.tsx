"use client";
import { ReactNode, useEffect } from "react";
import SideLeft from "./SideLeft";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";
import Link from "next/link";

interface Props {
  children: ReactNode;
  title: string;
  desc: string;
  showSignPrompt?: boolean;
}

const SideLayoutWrapper = ({
  children,
  title,
  desc,
  showSignPrompt = false,
}: Props) => {
  useEffect(() => {
    document.body.classList.add("body_on_center_layout");

    // Remove the class from the body element when the component unmounts
    return () => {
      document.body.classList.remove("body_on_center_layout");
    };
  }, []);

  return (
    <div className="flex h-fit w-screen flex-col lg:h-screen lg:flex-row lg:overflow-hidden">
      <SideLeft title={title} desc={desc} />
      <motion.div
        variants={defaultVariant({})}
        initial="hidden"
        whileInView="visible"
        viewport={DEFAULT_VIEWPORT}
        className="h-fit w-full bg-white px-2 py-4  max-lg:min-h-full lg:h-full lg:w-1/2 lg:overflow-y-scroll lg:px-10"
      >
        {showSignPrompt ? (
          <div className="mb-10 flex w-full max-lg:pr-4">
            <p className="text_small_body_r ml-auto w-fit text-right">
              Already have an account?{" "}
              <Link href="/auth/ministry/sign-in">
                <span className="cursor-pointer font-[500] text-accent transition-all duration-200 hover:underline">
                  Sign in
                </span>
              </Link>
            </p>
          </div>
        ) : (
          <div className="mb-10" />
        )}
        {children}
      </motion.div>
    </div>
  );
};

export default SideLayoutWrapper;
