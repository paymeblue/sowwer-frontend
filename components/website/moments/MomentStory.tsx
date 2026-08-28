"use client";

import BrandPhoto from "@components/shared/BrandPhoto";
import SectionContainer from "@components/sections/SectionContainer";
import { Button } from "@components/ui/button";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@lib/gsap";
import type { Moment } from "@lib/momentsContent";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

type Props = {
  moment: Moment;
  prev: Pick<Moment, "slug" | "title"> | null;
  next: Pick<Moment, "slug" | "title"> | null;
};

const MomentStory = ({ moment, prev, next }: Props) => {
  const scope = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();

      if (reduced) {
        gsap.set([".fx-hero", ".fx-up", ".fx-fact", ".fx-para", ".fx-tile"], {
          opacity: 1,
          y: 0,
          clearProps: "transform",
        });
        return;
      }

      // ---- Hero -------------------------------------------------------
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(".fx-hero-meta", { y: 18, opacity: 0, duration: 0.5 })
        .from(
          ".fx-hero-title",
          { y: 40, opacity: 0, duration: 0.85, stagger: 0.08 },
          "-=0.25"
        )
        .from(".fx-hero-sub", { y: 16, opacity: 0, duration: 0.5 }, "-=0.45");

      // The masked photograph lifts a little as the hero scrolls away; the
      // copy stays put so nothing fades out mid-read.
      gsap.to(".fx-hero-media", {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: ".fx-hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      // ---- Reading-progress rail --------------------------------------
      if (railRef.current) {
        gsap.fromTo(
          railRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: scope.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.3,
            },
          }
        );
      }

      // ---- Sections ---------------------------------------------------
      gsap.utils.toArray<HTMLElement>(".fx-up").forEach((el) => {
        gsap.from(el, {
          y: 34,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 84%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".fx-para").forEach((el) => {
        gsap.from(el, {
          y: 22,
          opacity: 0,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 86%" },
        });
      });

      // Facts count up from zero where the value is numeric.
      gsap.utils.toArray<HTMLElement>(".fx-fact").forEach((el, i) => {
        gsap.from(el, {
          y: 26,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });

        const num = el.querySelector<HTMLElement>(".fx-fact-num");
        const target = Number(num?.dataset.count);
        if (!num || !Number.isFinite(target) || target === 0) return;
        const counter = { v: 0 };
        gsap.to(counter, {
          v: target,
          duration: 1.3,
          ease: "power1.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            num.textContent =
              Math.round(counter.v).toLocaleString("en-US") +
              (num.dataset.suffix || "");
          },
        });
      });

      // ---- Pinned horizontal gallery ----------------------------------
      // Only on viewports wide enough for the pin to feel deliberate; the
      // same markup falls back to a normal scroll-snap strip below that.
      const track = trackRef.current;
      if (track) {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1024px)", () => {
          const distance = track.scrollWidth - track.clientWidth;
          if (distance <= 0) return;
          const tween = gsap.to(track, {
            x: -distance,
            ease: "none",
            scrollTrigger: {
              trigger: track.parentElement,
              start: "top top",
              end: () => `+=${distance + window.innerHeight * 0.5}`,
              pin: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });
          return () => tween.scrollTrigger?.kill();
        });
      }
    },
    { scope, dependencies: [moment.slug] }
  );

  const hasGallery = moment.gallery.length > 0;

  return (
    <article ref={scope} className="bg-white">
      <div
        aria-hidden
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left scale-x-0 bg-primary"
        ref={railRef}
      />

      {/* ------------------------------------------------ hero */}
      {/* Split hero: the story sits in type on the left, the photograph on the
          right inside the SOOWER mark. No full-bleed darkened background. */}
      <header className="fx-hero relative overflow-hidden bg-[#FCF9F2] pb-16 pt-28 md:pb-24 md:pt-36 lg:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(46% 60% at 88% 8%, rgba(255,198,41,0.18) 0%, transparent 68%), radial-gradient(40% 55% at 4% 92%, rgba(52,102,255,0.10) 0%, transparent 68%)",
          }}
        />

        <SectionContainer className="relative">
          <Link
            href="/#moments"
            className="fx-hero-meta mb-10 inline-flex items-center gap-2 font-montreal text-sm text-body-2 transition-colors hover:text-black"
          >
            <ArrowLeft size={15} />
            All moments
          </Link>

          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16">
            <div className="fx-hero-copy">
              <div className="fx-hero-meta mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="rounded-full bg-secondary-black px-3.5 py-1.5 font-montreal text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-primary">
                  {moment.kicker}
                </span>
                <span className="flex items-center gap-1.5 font-montreal text-sm text-body-2">
                  <Calendar size={14} />
                  <time dateTime={moment.dateISO}>{moment.date}</time>
                </span>
                <span className="flex items-center gap-1.5 font-montreal text-sm text-body-2">
                  <MapPin size={14} />
                  {moment.location}
                </span>
              </div>

              <h1 className="max-w-[15ch] overflow-hidden font-aeonik text-[2.75rem] font-medium leading-[0.98] tracking-[-0.03em] text-black sm:text-6xl lg:text-[4.5rem]">
                <span className="fx-hero-title block">{moment.title}</span>
              </h1>

              {moment.theme ? (
                <p className="fx-hero-sub mt-6 max-w-[34rem] border-l-2 border-primary pl-4 font-baskervville text-lg italic leading-snug text-body-1 md:text-2xl">
                  &ldquo;{moment.theme}&rdquo;
                </p>
              ) : null}

              <p className="fx-hero-sub mt-7 max-w-[34rem] font-montreal text-base leading-relaxed text-body-2 md:text-lg">
                {moment.blurb}
              </p>

              <div className="fx-hero-sub mt-9 flex flex-wrap items-center gap-3">
                <Link href="/donate/widow-care">
                  <Button className="gap-2 border-input font-montreal text-black">
                    Support this work
                    <ArrowRight size={15} />
                  </Button>
                </Link>
                {moment.gallery.length ? (
                  <a href="#gallery">
                    <Button
                      variant="outline"
                      className="border-black/15 gap-2 bg-transparent font-montreal text-black hover:bg-black/[0.04]"
                    >
                      View the gallery
                    </Button>
                  </a>
                ) : null}
              </div>
            </div>

            {/* Photograph in the SOOWER mark, with the headline figure pinned
                to it. Falls back to a typographic panel where no photography
                of the event survives. */}
            <div className="fx-hero-media relative mx-auto w-full max-w-[30rem] lg:mx-0">
              {moment.hero ? (
                <BrandPhoto
                  photos={[{ src: moment.hero, alt: moment.heroAlt }]}
                  className="aspect-[4/5] w-full"
                  sizes="(max-width: 1024px) 90vw, 480px"
                  priority
                />
              ) : (
                <div className="mask-soower relative flex aspect-[4/5] w-full flex-col items-center justify-center bg-secondary-black px-10 text-center">
                  <span className="font-aeonik text-4xl font-medium leading-none text-white">
                    {moment.date.split(",")[0]}
                  </span>
                  <span className="mt-3 font-baskervville text-sm italic text-white/60">
                    {moment.theme}
                  </span>
                </div>
              )}

              {moment.facts[0] ? (
                <div className="absolute -bottom-6 left-0 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-[0_12px_40px_-12px_rgba(3,6,33,0.28)] lg:-left-6">
                  <span className="font-aeonik text-2xl font-medium leading-none text-accent">
                    {moment.facts[0].value}
                  </span>
                  <span className="max-w-[8rem] font-montreal text-xs leading-snug text-body-2">
                    {moment.facts[0].label}
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        </SectionContainer>
      </header>

      {/* ------------------------------------------------ lede + facts */}
      <section className="border-b border-black/[0.07] bg-[#FCF9F2] py-16 md:py-24">
        <SectionContainer>
          <p className="fx-up max-w-[52rem] font-aeonik text-[1.4rem] font-medium leading-[1.35] tracking-[-0.01em] text-black md:text-[2rem]">
            {moment.intro}
          </p>

          <dl className="mt-12 grid grid-cols-1 gap-8 border-t border-black/10 pt-10 sm:grid-cols-3 sm:gap-6 md:mt-16">
            {moment.facts.map((fact) => {
              const numeric = fact.value.replace(/[^0-9]/g, "");
              const isCounted =
                /^[\d,]+\+?$/.test(fact.value) && numeric.length > 0;
              return (
                <div key={fact.label} className="fx-fact">
                  <dt className="font-aeonik text-[2.75rem] font-medium leading-none tracking-[-0.02em] text-accent md:text-[3.5rem]">
                    {isCounted ? (
                      <span
                        className="fx-fact-num"
                        data-count={numeric}
                        data-suffix={fact.value.includes("+") ? "+" : ""}
                      >
                        {fact.value}
                      </span>
                    ) : (
                      fact.value
                    )}
                  </dt>
                  <dd className="mt-3 max-w-[16rem] font-montreal text-sm leading-snug text-body-2">
                    {fact.label}
                  </dd>
                </div>
              );
            })}
          </dl>
        </SectionContainer>
      </section>

      {/* ------------------------------------------------ narrative */}
      <section className="py-16 md:py-24">
        <SectionContainer>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-20">
            <div className="max-w-[42rem] space-y-6">
              {moment.body.map((para, i) => (
                <p
                  key={i}
                  className="fx-para font-montreal text-base leading-[1.75] text-body-1 md:text-[1.0625rem]"
                >
                  {para}
                </p>
              ))}
            </div>

            <aside className="fx-up lg:sticky lg:top-28 lg:self-start">
              <h2 className="font-montreal text-xs font-semibold uppercase tracking-[0.16em] text-body-2">
                Delivered with
              </h2>
              <ul className="mt-5 space-y-2.5">
                {moment.partners.map((partner) => (
                  <li
                    key={partner}
                    className="border-l-2 border-primary/60 pl-3.5 font-montreal text-sm leading-snug text-body-1"
                  >
                    {partner}
                  </li>
                ))}
              </ul>
              <Link href="/donate/widow-care" className="mt-8 inline-block">
                <Button size="md" className="gap-2 font-montreal text-black">
                  Support this work
                  <ArrowRight size={15} />
                </Button>
              </Link>
            </aside>
          </div>
        </SectionContainer>
      </section>

      {/* ------------------------------------------------ quote */}
      {moment.quote ? (
        <section className="bg-secondary-black py-20 md:py-28">
          <SectionContainer>
            <figure className="fx-up mx-auto max-w-[54rem] text-center">
              <blockquote className="font-baskervville text-[1.6rem] italic leading-[1.3] text-white md:text-[2.75rem]">
                &ldquo;{moment.quote.text}&rdquo;
              </blockquote>
              <figcaption className="mt-7 font-montreal text-sm text-white/75">
                {moment.quote.source}
              </figcaption>
            </figure>
          </SectionContainer>
        </section>
      ) : null}

      {/* ------------------------------------------------ gallery */}
      {hasGallery ? (
        <section
          id="gallery"
          className="overflow-hidden bg-white py-16 md:py-24 lg:py-0"
        >
          <SectionContainer className="lg:hidden">
            <div className="fx-up mb-8 flex items-end justify-between gap-6">
              <h2 className="font-aeonik text-2xl font-medium tracking-[-0.02em] text-black md:text-4xl">
                From the day
              </h2>
              <span className="shrink-0 font-montreal text-xs text-body-2">
                Swipe →
              </span>
            </div>
          </SectionContainer>

          {/* On lg+ this whole block is pinned and the strip is scrubbed
              sideways; below lg it is a plain scroll-snap carousel. */}
          <div className="relative lg:flex lg:h-screen lg:flex-col lg:justify-center">
            <div className="hidden lg:block">
              <SectionContainer>
                <div className="mb-10 flex items-end justify-between gap-6">
                  <h2 className="font-aeonik text-4xl font-medium tracking-[-0.02em] text-black xl:text-5xl">
                    From the day
                  </h2>
                  <span className="shrink-0 font-montreal text-xs uppercase tracking-[0.14em] text-body-2">
                    {moment.gallery.length} photographs — keep scrolling
                  </span>
                </div>
              </SectionContainer>
            </div>

            <div
              ref={trackRef}
              className="scrollbar-none flex snap-x snap-mandatory scroll-pl-6 gap-4 overflow-x-auto px-6 pb-4 lg:gap-6 lg:overflow-visible lg:px-20"
            >
              {moment.gallery.map((photo, i) => (
                <figure
                  key={photo.src}
                  // On lg+ the tile is sized off viewport height so the pinned
                  // section always fits, however short the window is.
                  className="fx-tile group relative aspect-[4/5] w-[78vw] shrink-0 snap-center overflow-hidden rounded-2xl bg-grey sm:w-[52vw] md:w-[38vw] lg:aspect-[3/4] lg:h-[min(60vh,34rem)] lg:w-auto lg:snap-align-none"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 78vw, (max-width: 1024px) 38vw, 384px"
                    className="photo-real object-cover transition-transform ease-out [transition-duration:900ms] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5 pt-14">
                    <figcaption className="font-montreal text-xs leading-snug text-white/90">
                      <span className="mr-2 text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {photo.alt}
                    </figcaption>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ------------------------------------------------ prev / next */}
      <nav
        aria-label="More moments"
        className="border-t border-black/[0.07] bg-[#FCF9F2] py-14 md:py-20"
      >
        <SectionContainer>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { item: prev, label: "Previous", align: "" },
              { item: next, label: "Next", align: "sm:text-right" },
            ].map(({ item, label, align }) =>
              item ? (
                <Link
                  key={label}
                  href={`/moments/${item.slug}`}
                  className={`group rounded-2xl border border-black/[0.07] bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-18px_rgba(3,6,33,0.25)] ${align}`}
                >
                  <span className="font-montreal text-xs font-semibold uppercase tracking-[0.14em] text-body-2">
                    {label}
                  </span>
                  <span className="mt-2 flex items-center gap-2 font-aeonik text-xl font-medium leading-tight text-black sm:justify-start">
                    {item.title}
                    <ArrowUpRight
                      size={16}
                      className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              ) : (
                <span key={label} className="hidden sm:block" />
              )
            )}
          </div>
        </SectionContainer>
      </nav>
    </article>
  );
};

export default MomentStory;
