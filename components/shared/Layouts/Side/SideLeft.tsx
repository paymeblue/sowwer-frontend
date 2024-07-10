"use client";

import Logo from "@components/shared/Logo";
import { Button } from "@components/ui/button";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { ArrowLeft } from "react-iconly";

interface Props {
  title: string;
  desc: string | ReactNode;
  shouldGoBack?: boolean;
}

const SideLeft = ({ title, desc, shouldGoBack }: Props) => {
  const router = useRouter();
  return (
    <div className="w-full bg-primary p-10 lg:h-screen lg:max-h-screen lg:w-1/2 lg:overflow-hidden">
      <motion.div
        variants={defaultVariant({})}
        initial="hidden"
        whileInView="visible"
        viewport={DEFAULT_VIEWPORT}
        className="w-full"
      >
        <Logo logoVariant="black" />

        {shouldGoBack && (
          <Button
            variant="link"
            className="space-x-2 px-0 text-black"
            onClick={router.back}
          >
            <ArrowLeft size={15} />
            <span>Back</span>
          </Button>
        )}

        <div className="mt-0 space-y-2 lg:mt-10">
          <h2 className="text_variant_h2">{title}</h2>
          <p className="text_medium_body_p">{desc}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default SideLeft;
