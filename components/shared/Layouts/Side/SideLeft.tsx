"use client";

import Logo from "@components/shared/Logo";
import SmartImage from "@components/shared/SmartImage";
import { sitePhotos } from "@lib/soowerContent";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  title: string;
  desc: string | ReactNode;
  shouldGoBack?: boolean;
}

/**
 * The story half of the split forms (registry, council, ministry sign-up):
 * real outreach photography under an ink wash, so the form reads as joining
 * the work shown rather than filling in a yellow page.
 *
 * @param {Props} props Component props.
 * @return {JSX.Element} The left panel.
 */
const SideLeft = ({ title, desc, shouldGoBack }: Props) => {
  const router = useRouter();
  return (
    <div className="relative w-full overflow-hidden bg-secondary-black lg:h-screen lg:max-h-screen lg:w-1/2">
      <SmartImage
        src={sitePhotos.widowsWide}
        alt=""
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="photo-real object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-secondary-black/70 via-secondary-black/[0.55] to-secondary-black/95"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 45% at 0% 0%, rgba(255,198,41,0.28) 0%, transparent 70%)",
        }}
      />

      <motion.div
        variants={defaultVariant({})}
        initial="hidden"
        whileInView="visible"
        viewport={DEFAULT_VIEWPORT}
        className="relative flex h-full flex-col p-8 sm:p-10 lg:p-14"
      >
        <div className="flex items-center justify-between gap-4">
          <Logo logoVariant="white" />
          {shouldGoBack && (
            <button
              type="button"
              onClick={router.back}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-montreal text-sm text-white ring-1 ring-inset ring-white/[0.15] backdrop-blur-md transition-colors hover:bg-white/20"
            >
              <ArrowLeft size={15} />
              Back
            </button>
          )}
        </div>

        <div className="mt-12 lg:mt-auto">
          <h1 className="max-w-[16ch] font-aeonik text-[2.25rem] font-medium leading-[1.04] tracking-[-0.03em] text-white sm:text-5xl xl:text-[3.5rem]">
            {title}
          </h1>
          <div className="mt-6 max-w-[34rem] space-y-4 font-montreal text-base leading-relaxed text-white/70">
            {desc}
          </div>
        </div>

        <p className="mt-10 hidden font-script text-xl text-primary/90 lg:block">
          Perfectly positioned to lend a helping hand
        </p>
      </motion.div>
    </div>
  );
};

export default SideLeft;
