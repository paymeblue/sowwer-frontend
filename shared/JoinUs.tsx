"use client";

import BrandPhoto from "@components/shared/BrandPhoto";
import LogoMaskedPhoto from "@components/shared/LogoMaskedPhoto";
import { Button } from "@components/ui/button";
import { MovingBorderButton } from "@components/ui/moving-border";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@lib/gsap";
import { ctaMosaic, impactStats } from "@lib/soowerContent";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { memo, useRef } from "react";
import { Heart2 } from "react-iconly";

type Props = {
  /** Lead photograph — the largest cell in the bento. */
  img: StaticImageData | string;
  alt: string;
};

const PROGRAM_LINKS = [
  { label: "WidowCare", href: "/programs/widow-care" },
  { label: "The DAD Project", href: "/programs/dad-project" },
  { label: "MissionCare", href: "/programs/mission-care" },
  { label: "Partnerships", href: "/programs/partnerships" },
];

const JoinUs = ({ img, alt }: Props) => {
  const scope = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set([".cta-cell", ".cta-copy > *", ".cta-stat"], {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      const cells = gsap.utils.toArray<HTMLElement>(".cta-cell");

      // Cells assemble into the bento as the block enters the viewport, each
      // rotating in from a slightly different angle so they don't all land
      // on the same beat.
      cells.forEach((cell, i) => {
        const fromLeft = i % 2 === 0;
        gsap.from(cell, {
          y: 70,
          opacity: 0,
          scale: 0.88,
          rotate: fromLeft ? -3 : 3,
          duration: 0.9,
          delay: i * 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: scope.current, start: "top 76%" },
        });
      });

      gsap.from(".cta-copy > *", {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: scope.current, start: "top 68%" },
      });

      gsap.from(".cta-stat", {
        y: 18,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".cta-stats", start: "top 92%" },
      });

      // "The light increases as you scroll": a sunrise — a bright core low
      // in the section that grows and climbs as you scroll through, with a
      // wider ambient wash glowing in behind it. Background and text stay
      // put; this is a rising light source, not a theme change.
      const sunrise = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      sunrise
        .fromTo(
          ".cta-ray-ambient",
          { opacity: 0, scale: 0.6, yPercent: 12 },
          {
            opacity: 1,
            scale: 1.6,
            yPercent: -10,
            ease: "none",
            transformOrigin: "22% 100%",
          },
          0
        )
        .fromTo(
          ".cta-ray-core",
          { opacity: 0, scale: 0.4, yPercent: 18 },
          {
            opacity: 1,
            scale: 1.9,
            yPercent: -14,
            ease: "none",
            transformOrigin: "22% 100%",
          },
          0
        );

      // Each cell drifts at its own rate, so the grid separates into layers
      // as the section scrolls rather than moving as one flat block.
      cells.forEach((cell) => {
        const depth = Number(cell.dataset.depth || 1);
        gsap.to(cell, {
          yPercent: -6 * depth,
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      });

      // Cursor-driven parallax tilt on the whole grid, desktop pointer only —
      // a small perspective shift that makes the bento feel handled rather
      // than printed on the page.
      const grid = gridRef.current;
      if (
        grid &&
        window.matchMedia("(hover: hover) and (min-width: 1024px)").matches
      ) {
        const quickX = gsap.quickTo(grid, "rotateY", {
          duration: 0.6,
          ease: "power3.out",
        });
        const quickY = gsap.quickTo(grid, "rotateX", {
          duration: 0.6,
          ease: "power3.out",
        });
        const onMove = (e: PointerEvent) => {
          const rect = grid.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          quickX(px * 6);
          quickY(py * -6);
        };
        const onLeave = () => {
          quickX(0);
          quickY(0);
        };
        grid.addEventListener("pointermove", onMove);
        grid.addEventListener("pointerleave", onLeave);
        return () => {
          grid.removeEventListener("pointermove", onMove);
          grid.removeEventListener("pointerleave", onLeave);
        };
      }

      return undefined;
    },
    { scope }
  );

  const isRemote = typeof img === "string";

  return (
    <section
      ref={scope}
      aria-label="Get involved with SOOWER"
      className="relative overflow-hidden bg-black py-16 md:py-24 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 70% at 8% 0%, rgba(255,198,41,0.13) 0%, transparent 62%), radial-gradient(52% 66% at 96% 100%, rgba(52,102,255,0.16) 0%, transparent 62%)",
        }}
      />
      {/* Scroll-scrubbed "sunrise" — see the GSAP block above. A bright core
          rising from the bottom edge plus a wider ambient wash beneath it,
          both below the z-20 content so text and photos stay unaffected. */}
      <div
        aria-hidden
        className="cta-ray-ambient pointer-events-none absolute inset-0 z-[4] opacity-0"
        style={{
          background:
            "radial-gradient(60% 75% at 22% 105%, rgba(255,198,41,0.85) 0%, rgba(255,150,41,0.35) 40%, transparent 72%)",
          filter: "blur(50px)",
        }}
      />
      <div
        aria-hidden
        className="cta-ray-core pointer-events-none absolute inset-0 z-[5] opacity-0"
        style={{
          background:
            "radial-gradient(28% 40% at 22% 102%, rgba(255,241,199,0.98) 0%, rgba(255,198,41,0.9) 38%, transparent 75%)",
          filter: "blur(6px)",
        }}
      />
      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-6 lg:px-20">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="cta-copy order-2 max-w-[34rem] lg:order-1">
            <span className="eyebrow block">Get involved</span>
            <h2 className="mt-4 font-aeonik text-[2.25rem] font-medium leading-[1.03] tracking-[-0.025em] text-white sm:text-5xl lg:text-[3.75rem]">
              Be the light in someone&apos;s story
            </h2>
            <p className="text-white/65 mt-5 font-montreal text-base leading-relaxed md:text-lg">
              A stipend, a school bag, a health screening. Every gift here is
              already spoken for — it goes to a widow, an orphan or a missionary
              we can name.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/donate/widow-care">
                <MovingBorderButton>
                  <span>
                    <Heart2 set="bold" size={19} />
                  </span>
                  <span>Donate now</span>
                </MovingBorderButton>
              </Link>
              <Link href="/registry/join">
                <Button
                  variant="outline"
                  className="group gap-2 border-white/25 bg-transparent font-montreal text-white hover:bg-white/10 hover:text-white"
                >
                  <span>Partner with us</span>
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </Button>
              </Link>
            </div>

            <dl className="cta-stats mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-7">
              {impactStats.map((stat) => (
                <div key={stat.key} className="cta-stat">
                  <dt className="font-aeonik text-2xl font-medium leading-none text-primary md:text-3xl">
                    {stat.value.toLocaleString("en-US")}
                  </dt>
                  <dd className="mt-2 font-montreal text-[0.7rem] leading-snug text-white/50 md:text-xs">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Bento: lead frame, four photo cells (two masked into the SOOWER
              hexagon), the programme index, and the wordmark tile. */}
          <div
            ref={gridRef}
            style={{ transformStyle: "preserve-3d", perspective: "1400px" }}
            className="order-1 grid auto-rows-[5rem] grid-cols-6 gap-3 sm:auto-rows-[6.5rem] lg:order-2 lg:auto-rows-[6.5rem] lg:gap-4"
          >
            <figure
              data-depth="1"
              className="cta-cell group relative col-span-3 row-span-3 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5"
            >
              <Image
                src={img}
                alt={alt}
                fill
                sizes="(max-width: 1024px) 50vw, 26vw"
                className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                  isRemote ? "photo-real" : ""
                }`}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-14">
                <p className="font-montreal text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-primary">
                  The team
                </p>
                <p className="mt-1 font-aeonik text-base font-medium leading-tight text-white">
                  On the ground and behind the scenes
                </p>
              </div>
            </figure>

            {/* A face, cut into the SOOWER mark's own silhouette. */}
            <figure
              data-depth="2.4"
              className="cta-cell relative col-span-3 row-span-3 flex items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-3"
            >
              <BrandPhoto
                photos={[ctaMosaic[0], ctaMosaic[1]]}
                variant="soft"
                outline={false}
                className="h-full w-full max-w-[13rem]"
                sizes="220px"
              />
            </figure>

            <figure
              data-depth="1.7"
              className="cta-cell group relative col-span-2 row-span-2 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5"
            >
              <Image
                src={ctaMosaic[2].src}
                alt={ctaMosaic[2].alt}
                fill
                sizes="(max-width: 1024px) 40vw, 20vw"
                loading="lazy"
                className="photo-real object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </figure>

            {/* Programme index — the one cell that is type, not photography,
                so the grid has somewhere for the eye to rest. */}
            <nav
              data-depth="0.6"
              aria-label="Our programmes"
              className="cta-cell col-span-4 row-span-2 flex flex-col justify-center gap-0.5 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm"
            >
              <p className="mb-1 font-montreal text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/40">
                Give to
              </p>
              {PROGRAM_LINKS.map((program) => (
                <Link
                  key={program.href}
                  href={program.href}
                  className="group flex items-center justify-between gap-2 border-b border-white/[0.07] py-1.5 font-montreal text-[0.8rem] text-white/75 transition-colors last:border-0 hover:text-primary"
                >
                  {program.label}
                  <ArrowUpRight
                    size={13}
                    className="shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </Link>
              ))}
            </nav>

            <figure
              data-depth="1.4"
              className="cta-cell group relative col-span-2 row-span-2 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5"
            >
              <Image
                src={ctaMosaic[3].src}
                alt={ctaMosaic[3].alt}
                fill
                sizes="(max-width: 1024px) 40vw, 20vw"
                loading="lazy"
                className="photo-real object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </figure>

            <figure
              data-depth="2.1"
              className="cta-cell group relative col-span-2 row-span-2 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5"
            >
              <Image
                src={ctaMosaic[4].src}
                alt={ctaMosaic[4].alt}
                fill
                sizes="(max-width: 1024px) 40vw, 20vw"
                loading="lazy"
                className="photo-real object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </figure>

            {/* The wordmark itself, with a second face poured into it. */}
            <div
              data-depth="2.8"
              className="cta-cell relative col-span-2 row-span-2 flex items-center gap-3 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(70% 90% at 22% 50%, rgba(255,198,41,0.22) 0%, transparent 70%)",
                }}
              />
              <LogoMaskedPhoto
                src={ctaMosaic[5].src}
                alt={ctaMosaic[5].alt}
                className="relative h-full w-[46%] shrink-0"
              />
              <p className="relative font-script text-xl leading-none text-white/80">
                Perfectly positioned to lend a helping hand
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(JoinUs);
